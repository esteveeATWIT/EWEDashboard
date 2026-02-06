import type { Article, Game, SportsBrief, TeamKey } from "@/types/dashboard";

export interface SportsProvider {
  getUpcomingGames(team: TeamKey): Promise<Game[]>;
  getBreakingNews(team: TeamKey): Promise<SportsBrief[]>;
}

export interface NewsProvider {
  getTopWorldNews(): Promise<Article[]>;
}

export interface AiNewsProvider {
  getAiNewsWithMarketImpact(): Promise<Article[]>;
}
