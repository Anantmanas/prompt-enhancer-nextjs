import { NextResponse } from "next/server";
import { mockHistory } from "@/features/history/mockHistory";

export async function GET() {
  return NextResponse.json({ prompts: mockHistory });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json(
    {
      prompt: {
        id: crypto.randomUUID(),
        ...body,
        createdAt: new Date().toISOString()
      }
    },
    { status: 201 }
  );
}
