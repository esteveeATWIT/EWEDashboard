import { NextRequest, NextResponse } from "next/server";
import { withCache } from "@/lib/server/cache";
import { applyRateLimit } from "@/lib/server/rateLimit";
import { sportsProvider } from "@/lib/providers";
import type { TeamKey } from "@/types/dashboard";

function isTeamKey(value: string): value is TeamKey {
  return value === "flamengo" || value === "dallas_mavericks";
}

export async function GET(request: NextRequest) {
  const requestKey = request.headers.get("x-forwarded-for") ?? "local";
  if (!applyRateLimit(`sports:${requestKey}`)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const team = request.nextUrl.searchParams.get("team") ?? "flamengo";
  if (!isTeamKey(team)) {
    return NextResponse.json({ error: "Invalid team" }, { status: 400 });
  }

  try {
    const payload = await withCache(`sports:${team}`, 60_000, async () => {
      const [games, briefs] = await Promise.all([
        sportsProvider.getUpcomingGames(team),
        sportsProvider.getBreakingNews(team)
      ]);
      return { team, games, briefs, updatedAt: new Date().toISOString() };
    });

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
