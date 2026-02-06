# Personal Browser Dashboard — PRD + Technical Architecture

## Product goals
- Deliver a fast, visually modern new-tab dashboard with card-based sections for Sports, To-Dos, World News, and AI+Market impact.
- Provide trusted attribution for each external item and surface diverse sources.
- Keep MVP setup simple with local persistence for tasks and server-mediated data fetching for all external APIs.

## Core user stories (MVP)
1. As a user, I can see upcoming games for Flamengo and Dallas Mavericks at a glance.
2. As a user, I can quickly capture/edit/check/delete sticky-note tasks and keep them after refresh.
3. As a user, I can read world news and AI/market digest headlines with source links.
4. As a user, I can trust that API keys are not exposed in browser code.

## Non-functional requirements
- Initial payload should be lightweight; each card fetches independently to avoid full-page blocking.
- Server route responses use short TTL cache and in-memory rate-limit guard.
- External providers are swappable through interfaces.
- TypeScript strict mode, linting, formatting, tests, and CI.

## Architecture

### Frontend
- Next.js App Router page composes card widgets.
- Client cards call internal API routes (`/api/sports`, `/api/news`, `/api/ai-news`) and handle loading/error states.
- `TodoCard` uses `localStorage` for MVP persistence via `useTodos` hook.

### Backend (Next route handlers)
- Route handlers form a Backend-for-Frontend layer.
- Each route applies:
  1) `applyRateLimit` guard
  2) `withCache` TTL cache wrapper
  3) Provider call
- Result payload includes `updatedAt` to support UX transparency.

### Data provider abstraction
- Interfaces: `SportsProvider`, `NewsProvider`, `AiNewsProvider`.
- Providers in MVP:
  - `EspnSportsProvider` (real implementation via ESPN APIs)
  - `NewsApiWorldProvider`, `NewsApiAiProvider` (real implementation via NewsAPI)
  - `Placeholder*Provider` as fallback via env flag.

### Provider options (recommended)
- Sports:
  1. ESPN public endpoints (implemented)
  2. Sportmonks (paid, richer injuries/lineups)
  3. API-Football + NBA APIs (higher control, more integration work)
- World news:
  1. NewsAPI (implemented)
  2. GNews
  3. Mediastack
- AI+market digest:
  1. NewsAPI keyword query (implemented)
  2. Financial Modeling Prep + AI-specific feeds
  3. Event Registry for source diversity scoring

### Optional feature flag
- `ENABLE_AGENT_CHAT=true` renders chat panel area.
- Production path: server-side chat route with retrieval + citation metadata.

## Incremental delivery plan
- MVP: current scope in this scaffold.
- V1: richer sports events (injuries/transfers), source diversity controls, dark mode, persistent cache backend (Redis).
- V2: authenticated profiles, synced todos, personalized ranking, agent chat with cited responses.
