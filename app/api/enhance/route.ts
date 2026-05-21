import { NextResponse } from "next/server";
import { enhancePrompt, estimateCredits } from "@/features/enhancer/enhancePrompt";
import type { EnhanceRequest } from "@/features/enhancer/types";

export const maxDuration = 60;

const NVIDIA_INVOKE_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const NVIDIA_MODEL = "nvidia/nemotron-3-super-120b-a12b";

type NvidiaChatCompletion = {
  requestId?: string;
  choices?: Array<{
    delta?: {
      content?: string;
      reasoning_content?: string;
    };
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
  detail?: string;
  message?: string;
  status?: string;
};

function getMaxTokens(request: EnhanceRequest) {
  const detailTokens = {
    concise: 900,
    balanced: 1600,
    deep: 2600
  };

  return detailTokens[request.detailLevel];
}

function getReasoningBudget(request: EnhanceRequest) {
  const reasoningTokens = {
    concise: 128,
    balanced: 256,
    deep: 512
  };

  return reasoningTokens[request.detailLevel];
}

function getTimeoutMs(request: EnhanceRequest, stream: boolean) {
  if (!stream) {
    return request.detailLevel === "deep" ? 28_000 : 22_000;
  }

  return request.detailLevel === "deep" ? 46_000 : 38_000;
}

function parseStreamChunk(chunk: string) {
  return chunk
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6).trim())
    .filter((line) => line && line !== "[DONE]")
    .map((line) => {
      try {
        const event = JSON.parse(line) as NvidiaChatCompletion;
        return event.choices?.[0]?.delta?.content ?? event.choices?.[0]?.message?.content ?? "";
      } catch {
        return "";
      }
    })
    .join("");
}

async function readNemotronStream(response: Response) {
  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error("Nemotron did not return a readable response stream.");
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let content = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() ?? "";
    content += events.map(parseStreamChunk).join("");
  }

  content += parseStreamChunk(buffer + decoder.decode());

  return content.trim();
}

async function parseErrorResponse(response: Response) {
  const fallback = `Nemotron request failed with status ${response.status}.`;

  try {
    const text = await response.text();

    if (!text) {
      return fallback;
    }

    try {
      const data = JSON.parse(text) as NvidiaChatCompletion;
      const message = data.error?.message ?? data.detail ?? data.message;
      return message ? `${fallback} ${message}` : `${fallback} ${text.slice(0, 300)}`;
    } catch {
      return `${fallback} ${text.slice(0, 300)}`;
    }
  } catch {
    return fallback;
  }
}

async function readNemotronJson(response: Response) {
  const data = (await response.json().catch(() => null)) as NvidiaChatCompletion | null;
  return data?.choices?.[0]?.message?.content?.trim() ?? "";
}

function buildNemotronPayload(instructionPrompt: string, request: EnhanceRequest, stream: boolean) {
  return {
    model: NVIDIA_MODEL,
    messages: [{ role: "user", content: instructionPrompt }],
    max_tokens: getMaxTokens(request),
    temperature: 0.75,
    top_p: 0.95,
    stream,
    chat_template_kwargs: { enable_thinking: true, low_effort: request.detailLevel !== "deep" },
    reasoning_budget: getReasoningBudget(request)
  };
}

async function callNemotron(instructionPrompt: string, request: EnhanceRequest, stream: boolean, apiKey: string) {
  return fetch(NVIDIA_INVOKE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: stream ? "text/event-stream" : "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildNemotronPayload(instructionPrompt, request, stream)),
    signal: AbortSignal.timeout(getTimeoutMs(request, stream))
  });
}

async function generateWithNemotron(instructionPrompt: string, request: EnhanceRequest) {
  const apiKey = process.env.NVIDIA_API_KEY || process.env.AI_PROVIDER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing NVIDIA_API_KEY. Add it to .env.local and Vercel Environment Variables.");
  }

  let response = await callNemotron(instructionPrompt, request, true, apiKey);

  if (response.status >= 500) {
    response = await callNemotron(instructionPrompt, request, false, apiKey);
  }

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  const contentType = response.headers.get("content-type") ?? "";
  const content = contentType.includes("text/event-stream") ? await readNemotronStream(response) : await readNemotronJson(response);

  if (!content) {
    throw new Error("Nemotron returned an empty enhancement.");
  }

  return content;
}

function isTimeoutError(error: unknown) {
  return error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
}

function buildLocalEnhancement(request: EnhanceRequest) {
  const rawPrompt = request.rawPrompt.trim();

  if (!rawPrompt) {
    throw new Error("Add a prompt before enhancing.");
  }

  const modeGoals = {
    code: "generate implementation-ready code with clear architecture, edge cases, and verification steps",
    creative: "produce a polished creative response with voice, audience, structure, and constraints",
    business: "create a business-ready response with positioning, audience, outcomes, and next actions",
    developer: "solve the technical task with debugging context, tradeoffs, acceptance criteria, and validation"
  };

  const formatGoals = {
    structured: "Use labeled sections and concise bullet points.",
    checklist: "Use a checklist with acceptance criteria.",
    markdown: "Return clean Markdown that is ready to copy.",
    json: "Return a JSON-ready structure with role, task, context, constraints, and output fields."
  };

  return [
    `Act as a ${request.tone} AI assistant optimized for ${request.model}.`,
    "",
    "Task:",
    rawPrompt,
    "",
    "Goal:",
    `Refine the request so the response can ${modeGoals[request.mode]}.`,
    "",
    "Requirements:",
    "- Preserve the original intent.",
    "- Remove ambiguity and define the expected output clearly.",
    "- Include relevant constraints, assumptions, edge cases, and success criteria.",
    `- Detail level: ${request.detailLevel}.`,
    `- Context: ${request.includeContext ? "add reasonable assumptions and label them clearly" : "use only the provided information"}.`,
    `- Format: ${formatGoals[request.outputFormat]}`,
    "",
    "Final output:",
    "Return only the completed answer or artifact requested by the prompt."
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnhanceRequest;
    const instructionPrompt = enhancePrompt(body);
    let enhancedPrompt: string;
    let provider = "nvidia-nemotron-3-super-120b-a12b";
    let warning: string | undefined;

    try {
      enhancedPrompt = await generateWithNemotron(instructionPrompt, body);
    } catch (generationError) {
      if (!isTimeoutError(generationError)) {
        throw generationError;
      }

      enhancedPrompt = buildLocalEnhancement(body);
      provider = "local-timeout-fallback";
      warning = "Nemotron was slow, so PromptEnhance returned a local fallback prompt.";
    }

    const creditsUsed = estimateCredits(body.rawPrompt, body.model);

    return NextResponse.json({
      enhancedPrompt,
      creditsUsed,
      provider,
      warning
    });
  } catch (error) {
    const isTimeout = isTimeoutError(error);

    return NextResponse.json(
      {
        error: isTimeout
          ? "Nemotron took too long to respond. Try a shorter prompt or a lower detail setting."
          : error instanceof Error
            ? error.message
            : "Unable to enhance prompt."
      },
      { status: isTimeout ? 504 : 400 }
    );
  }
}
