import type { AiNewsProvider, NewsProvider, SportsProvider } from "./interfaces";
import type { Article, Game, SportsBrief, TeamKey } from "@/types/dashboard";

const gamesByTeam: Record<TeamKey, Game[]> = {
  flamengo: [
    {
      id: "fla-001",
      league: "Brasileirão Série A",
      homeTeam: "Flamengo",
      awayTeam: "Palmeiras",
      startsAt: new Date(Date.now() + 86_400_000).toISOString(),
      status: "Scheduled"
    }
  ],
  dallas_mavericks: [
    {
      id: "dal-001",
      league: "NBA",
      homeTeam: "Dallas Mavericks",
      awayTeam: "Denver Nuggets",
      startsAt: new Date(Date.now() + 172_800_000).toISOString(),
      status: "Scheduled"
    }
  ]
};

const sportsNewsByTeam: Record<TeamKey, SportsBrief[]> = {
  flamengo: [
    {
      id: "fla-n-1",
      title: "Flamengo expected to rotate midfield",
      summary: "Local outlets report lineup flexibility ahead of next fixture.",
      source: "Placeholder Wire",
      url: "https://example.com/flamengo-story",
      publishedAt: new Date().toISOString()
    }
  ],
  dallas_mavericks: [
    {
      id: "dal-n-1",
      title: "Mavericks injury watch for upcoming game",
      summary: "Beat coverage flags probable status for key rotation players.",
      source: "Placeholder Wire",
      url: "https://example.com/mavs-story",
      publishedAt: new Date().toISOString()
    }
  ]
};

const worldNews: Article[] = [
  {
    id: "world-1",
    title: "Global policy summit focuses on inflation and growth",
    summary: "Coverage from multiple regions points to mixed economic outlook.",
    source: "Reuters",
    url: "https://www.reuters.com",
    publishedAt: new Date().toISOString()
  },
  {
    id: "world-2",
    title: "Energy ministers outline regional grid investments",
    summary: "European and Asian agencies announced cross-border collaborations.",
    source: "Associated Press",
    url: "https://apnews.com",
    publishedAt: new Date().toISOString()
  }
];

const aiNews: Article[] = [
  {
    id: "ai-1",
    title: "Foundation model vendor announces enterprise rollout",
    summary: "Analysts expect moderate productivity gains in support operations.",
    source: "Financial Times",
    url: "https://www.ft.com",
    publishedAt: new Date().toISOString()
  }
];

export class PlaceholderSportsProvider implements SportsProvider {
  async getUpcomingGames(team: TeamKey): Promise<Game[]> {
    return gamesByTeam[team];
  }

  async getBreakingNews(team: TeamKey): Promise<SportsBrief[]> {
    return sportsNewsByTeam[team];
  }
}

export class PlaceholderWorldNewsProvider implements NewsProvider {
  async getTopWorldNews(): Promise<Article[]> {
    return worldNews;
  }
}

export class PlaceholderAiNewsProvider implements AiNewsProvider {
  async getAiNewsWithMarketImpact(): Promise<Article[]> {
    return aiNews;
  }
}
