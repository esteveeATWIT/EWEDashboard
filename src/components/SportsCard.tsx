"use client";

import { useEffect, useState } from "react";
import { CardShell } from "./CardShell";
import { LoadingSkeleton } from "./LoadingSkeleton";
import type { Game, SportsBrief } from "@/types/dashboard";
import { formatEventTime, formatRelative } from "@/lib/utils";

interface SportsPayload {
  team: string;
  games: Game[];
  briefs: SportsBrief[];
  updatedAt: string;
}

export function SportsCard({ team, title }: { team: "flamengo" | "dallas_mavericks"; title: string }) {
  const [data, setData] = useState<SportsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/sports?team=${team}`)
      .then((res) => res.json())
      .then((payload) => setData(payload as SportsPayload))
      .catch(() => setError("Could not load sports data."));
  }, [team]);

  return (
    <CardShell>
      <h2 className="text-lg font-semibold">{title}</h2>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {!error && !data && <LoadingSkeleton />}
      {data && (
        <>
          <p className="mt-1 text-xs text-slate-500">Updated {formatRelative(data.updatedAt)}</p>
          <h3 className="mt-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Upcoming games</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {data.games.map((game) => (
              <li key={game.id} className="rounded-xl bg-slate-50 p-2">
                <p className="font-medium">{game.awayTeam} @ {game.homeTeam}</p>
                <p className="text-xs text-slate-500">{formatEventTime(game.startsAt)} · {game.status}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Breaking news</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {data.briefs.map((brief) => (
              <li key={brief.id}>
                <a className="font-medium text-brand-700 hover:underline" href={brief.url} target="_blank" rel="noreferrer">
                  {brief.title}
                </a>
                <p className="text-xs text-slate-600">{brief.source}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </CardShell>
  );
}
