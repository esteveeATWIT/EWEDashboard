import type { SportsProvider } from "./interfaces";
import type { Game, SportsBrief, TeamKey } from "@/types/dashboard";
import { safeFetchJson } from "@/lib/server/http";

const TEAM_MAP: Record<TeamKey, { sport: string; league: string; teamId: string; displayName: string }> = {
  flamengo: { sport: "soccer", league: "bra.1", teamId: "819", displayName: "Flamengo" },
  dallas_mavericks: { sport: "basketball", league: "nba", teamId: "6", displayName: "Dallas Mavericks" }
};

interface EspnScoreboardResponse {
  events: Array<{
    id: string;
    date: string;
    status: { type: { description: string } };
    competitions: Array<{ competitors: Array<{ homeAway: string; team: { displayName: string } }> }>;
  }>;
}

interface EspnNewsResponse {
  articles?: Array<{
    headline: string;
    description?: string;
    published?: string;
    links?: { web?: { href?: string } };
    source?: string;
  }>;
}

export class EspnSportsProvider implements SportsProvider {
  async getUpcomingGames(team: TeamKey): Promise<Game[]> {
    const meta = TEAM_MAP[team];
    const endpoint = `https://site.api.espn.com/apis/site/v2/sports/${meta.sport}/${meta.league}/scoreboard?teams=${meta.teamId}`;
    const payload = await safeFetchJson<EspnScoreboardResponse>(endpoint);

    return payload.events.slice(0, 5).map((event) => {
      const competitors = event.competitions[0]?.competitors ?? [];
      const home = competitors.find((c) => c.homeAway === "home")?.team.displayName ?? "TBD";
      const away = competitors.find((c) => c.homeAway === "away")?.team.displayName ?? "TBD";

      return {
        id: event.id,
        league: meta.league.toUpperCase(),
        homeTeam: home,
        awayTeam: away,
        startsAt: event.date,
        status: event.status.type.description
      };
    });
  }

  async getBreakingNews(team: TeamKey): Promise<SportsBrief[]> {
    const meta = TEAM_MAP[team];
    const endpoint = `https://site.api.espn.com/apis/site/v2/sports/${meta.sport}/${meta.league}/news`;
    const payload = await safeFetchJson<EspnNewsResponse>(endpoint);

    return (payload.articles ?? [])
      .filter((article) => article.headline.toLowerCase().includes(meta.displayName.toLowerCase().split(" ")[0]))
      .slice(0, 4)
      .map((article, index) => ({
        id: `${team}-brief-${index}`,
        title: article.headline,
        summary: article.description ?? "No description available.",
        url: article.links?.web?.href ?? "https://www.espn.com",
        source: article.source ?? "ESPN",
        publishedAt: article.published ?? new Date().toISOString()
      }));
  }
}
