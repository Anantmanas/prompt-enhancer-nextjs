import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const id = crypto.randomUUID().slice(0, 8);

  return NextResponse.json({
    id,
    promptId: body.promptId ?? null,
    url: `/share/${id}`,
    isPublic: true
  });
}
