import type { AiNewsProvider, NewsProvider } from "./interfaces";
import type { Article } from "@/types/dashboard";
import { safeFetchJson } from "@/lib/server/http";

interface NewsApiResponse {
  articles: Array<{
    title: string;
    description?: string;
    url: string;
    source: { name: string };
    publishedAt: string;
  }>;
}

function mapArticles(prefix: string, payload: NewsApiResponse): Article[] {
  return payload.articles.slice(0, 8).map((article, index) => ({
    id: `${prefix}-${index}`,
    title: article.title,
    summary: article.description ?? "Summary unavailable.",
    url: article.url,
    source: article.source.name,
    publishedAt: article.publishedAt
  }));
}

export class NewsApiWorldProvider implements NewsProvider {
  async getTopWorldNews(): Promise<Article[]> {
    const key = process.env.NEWS_API_KEY;
    if (!key) {
      throw new Error("NEWS_API_KEY is missing.");
    }

    const url = `https://newsapi.org/v2/top-headlines?language=en&category=general&pageSize=10&apiKey=${key}`;
    const payload = await safeFetchJson<NewsApiResponse>(url);
    return mapArticles("world", payload);
  }
}

export class NewsApiAiProvider implements AiNewsProvider {
  async getAiNewsWithMarketImpact(): Promise<Article[]> {
    const key = process.env.NEWS_API_KEY;
    if (!key) {
      throw new Error("NEWS_API_KEY is missing.");
    }

    const query = encodeURIComponent("artificial intelligence market earnings startups regulation");
    const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${key}`;
    const payload = await safeFetchJson<NewsApiResponse>(url);
    return mapArticles("ai", payload);
  }
}
