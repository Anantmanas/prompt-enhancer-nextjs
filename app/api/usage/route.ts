import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    plan: "Free",
    monthlyCredits: 50,
    creditsUsed: 12,
    creditsRemaining: 38,
    resetDate: "2026-06-01"
  });
}
