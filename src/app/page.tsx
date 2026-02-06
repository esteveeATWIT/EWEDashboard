import { NewsCard } from "@/components/NewsCard";
import { SportsCard } from "@/components/SportsCard";
import { TodoCard } from "@/components/TodoCard";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Personal Browser Dashboard</h1>
        <p className="text-slate-600">Sports, sticky tasks, world headlines, and AI business signal in one view.</p>
      </header>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <TodoCard />
          <NewsCard title="World News" endpoint="/api/news" />
        </div>
        <div className="space-y-4">
          <SportsCard team="flamengo" title="Flamengo" />
          <SportsCard team="dallas_mavericks" title="Dallas Mavericks" />
        </div>
        <div className="space-y-4">
          <NewsCard title="AI + Market Impact" endpoint="/api/ai-news" />
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-5">
            <h2 className="text-lg font-semibold">Agent Chat (Optional)</h2>
            <p className="text-sm text-slate-500">Feature flag: ENABLE_AGENT_CHAT=true (server-mediated integration planned).</p>
          </section>
        </div>
      </div>
    </main>
  );
}
