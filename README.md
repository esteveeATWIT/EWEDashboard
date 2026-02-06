# Personal Browser Dashboard

Modern browser homepage/new-tab dashboard built with Next.js + TypeScript + Tailwind.

## Stack
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Provider adapters for Sports/News/AI feeds
- Vitest + Testing Library

## Required environment variables
Create `.env.local`:

```bash
# Switch true for local placeholder data (no external API requirements)
USE_PLACEHOLDER_DATA=true

# Needed only when USE_PLACEHOLDER_DATA=false
NEWS_API_KEY=your_newsapi_key

# Optional future feature
ENABLE_AGENT_CHAT=false
```

## Setup
```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Provider architecture
All third-party calls are routed through server endpoints:
- `GET /api/sports?team=flamengo|dallas_mavericks`
- `GET /api/news`
- `GET /api/ai-news`

Each route uses:
- in-memory rate limiter (`src/lib/server/rateLimit.ts`)
- in-memory cache wrapper (`src/lib/server/cache.ts`)
- pluggable providers (`src/lib/providers/*`)

## Folder structure
```text
src/
  app/
    api/
    page.tsx
  components/
  hooks/
  lib/
    providers/
    server/
  types/
docs/
  prd-architecture.md
```

## Deployment (Vercel)
1. Push repo to GitHub.
2. Import in Vercel.
3. Configure environment variables.
4. Deploy.

## Roadmap
- **MVP (now):** card layout, todos, sports schedule, world+AI feeds, provider abstraction, API route guards.
- **V1:** improved sports injury/transfer feeds, source diversity badges, retry UX + observability.
- **V2:** auth/sync, personalization, chat agent with server-mediated citations.
