import type { PropsWithChildren } from "react";

export function CardShell({ children }: PropsWithChildren) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">{children}</section>;
}
