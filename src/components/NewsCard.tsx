"use client";

import { useEffect, useState } from "react";
import { CardShell } from "./CardShell";
import { LoadingSkeleton } from "./LoadingSkeleton";
import type { Article } from "@/types/dashboard";
import { formatRelative } from "@/lib/utils";

interface NewsPayload {
  updatedAt: string;
  articles: Article[];
}

export function NewsCard({ title, endpoint }: { title: string; endpoint: "/api/news" | "/api/ai-news" }) {
  const [data, setData] = useState<NewsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(endpoint);
        const payload = await res.json();
        if (!res.ok || payload?.error) {
          if (!cancelled) {
            setError(payload?.error ?? "Could not load news feed.");
            setData(null);
          }
          return;
        }

        const articles = Array.isArray(payload?.articles) ? (payload.articles as Article[]) : [];
        const updatedAt = typeof payload?.updatedAt === "string" ? payload.updatedAt : new Date().toISOString();
        if (!cancelled) {
          setError(null);
          setData({ updatedAt, articles });
        }
      } catch {
        if (!cancelled) {
          setError("Could not load news feed.");
          setData(null);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return (
    <CardShell>
      <h2 className="text-lg font-semibold">{title}</h2>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {!error && !data && <LoadingSkeleton />}
      {data && (
        <>
          <p className="mt-1 text-xs text-slate-500">Updated {formatRelative(data.updatedAt)}</p>
          <ul className="mt-3 space-y-3">
            {data.articles.map((article) => (
              <li key={article.id}>
                <a href={article.url} target="_blank" rel="noreferrer" className="font-medium text-brand-700 hover:underline">
                  {article.title}
                </a>
                <p className="text-xs text-slate-600">{article.source}</p>
                <p className="text-xs text-slate-500">{article.summary}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </CardShell>
  );
}
