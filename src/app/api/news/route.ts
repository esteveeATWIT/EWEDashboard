import { NextResponse } from "next/server";
import { worldNewsProvider } from "@/lib/providers";
import { withCache } from "@/lib/server/cache";
import { applyRateLimit } from "@/lib/server/rateLimit";

export async function GET(request: Request) {
  const requestKey = request.headers.get("x-forwarded-for") ?? "local";
  if (!applyRateLimit(`news:${requestKey}`)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const payload = await withCache("news:world", 120_000, async () => ({
      updatedAt: new Date().toISOString(),
      articles: await worldNewsProvider.getTopWorldNews()
    }));

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: "World news provider unavailable" }, { status: 500 });
  }
}
