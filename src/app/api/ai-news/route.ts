import { NextResponse } from "next/server";
import { aiNewsProvider } from "@/lib/providers";
import { withCache } from "@/lib/server/cache";
import { applyRateLimit } from "@/lib/server/rateLimit";

export async function GET(request: Request) {
  const requestKey = request.headers.get("x-forwarded-for") ?? "local";
  if (!applyRateLimit(`ai-news:${requestKey}`)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const payload = await withCache("news:ai", 120_000, async () => ({
      updatedAt: new Date().toISOString(),
      articles: await aiNewsProvider.getAiNewsWithMarketImpact()
    }));

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: "AI news provider unavailable" }, { status: 500 });
  }
}
