export type TeamKey = "flamengo" | "dallas_mavericks";

export interface Game {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startsAt: string;
  status: string;
}

export interface SportsBrief {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
}
