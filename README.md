<div align="center">

<br />

# ⏳ SpentHours

### _See the true cost of your screen time_

<br />

![React](https://img.shields.io/badge/React-19-7C3AED?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-7C3AED?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-1A0A2E?style=flat-square&logo=typescript&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-1A0A2E?style=flat-square&logo=cssmodules&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white)

<br />

> Mark the movies & shows you've watched, and SpentHours turns those hours into
> something tangible — books you could have read, skills you could have learned,
> days of life lived a little differently. Not to shame anyone. Just to make the
> invisible visible.

<br />

</div>

---

## ✨ Features

- **Live TMDB catalog** — search across _every_ movie & show on TheMovieDB, not a fixed list
- **Infinite scroll** — real pagination that keeps loading as you go, in every filter
- **Smart recommendations** — “you might have also watched” powered by TMDB recommendations, kept to the same kind (cartoon → cartoons, anime → anime, K-drama → K-drama)
- **Typo-tolerant search** — `holms` still finds _Sherlock Holmes_
- **Your shelf** — everything you mark is saved to the browser (no account, no tracking)
- **Analytics** — your watched hours translated into books read, languages, skills, workouts… with realistic Junior/Medium/Senior levels for career skills
- **Design tokens** — one `--brand` variable recolours the whole app
- **CSS Modules** — co-located, scoped styles per component

---

## 🛠 Tech Stack

| Layer       | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | **React 19** + **TypeScript**                      |
| Build       | **Vite 7**                                         |
| Styling     | **CSS Modules** + design tokens                    |
| Routing     | **wouter**                                         |
| Data        | **TMDB API** (live search / discover / recommend)  |
| Persistence | **localStorage** (your shelf)                      |
| Icons       | **lucide-react**                                   |

---

## 📁 Project Structure

```
client/src/
├── components/
│   ├── ui/              # Reusable primitives (each + .module.css)
│   │   ├── PillButton · Chip · StatBadge
│   │   ├── Modal · Loader · PosterCard
│   └── Logo · ErrorBoundary
├── features/
│   ├── catalog/         # useCatalog hook + CatalogHeader
│   ├── similar/         # SimilarDialog + useRecommendations
│   ├── analytics/       # AnalyticsDialog + hobbies.ts
│   ├── onboarding/      # ProfileDialog
│   └── home/            # landing sections (Hero, HowItWorks, CtaBanner, AuthorNote…)
├── hooks/               # useShelf · useCatalog · useRuntimes · useInfiniteScroll
├── lib/                 # tmdb.ts (API client) · heroPosters.ts
├── styles/              # tokens.css (colours, radii, shadows, type)
└── pages/               # Home.tsx · AppPage.tsx (thin, compose features)
```

---

## 🚀 Getting Started

**1. Clone the repo**

```bash
git clone https://github.com/KausarShangareeva/spenthours.git
cd spenthours
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Add your TMDB API key**

Get a free key at [themoviedb.org](https://www.themoviedb.org/settings/api), then create a `.env` in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_v3_api_key
```

**4. Run the dev server**

```bash
pnpm dev
```

Open **http://localhost:3000** (Vite picks the next free port if it's taken).

---

## 📜 Scripts

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `pnpm dev`      | Start the Vite dev server             |
| `pnpm build`    | Production build                      |
| `pnpm preview`  | Preview the production build          |
| `pnpm check`    | Type-check with `tsc --noEmit`        |
| `pnpm format`   | Format the codebase with Prettier     |

---

## 🎨 Design Tokens

Defined once in [`client/src/styles/tokens.css`](client/src/styles/tokens.css) — change `--brand` to recolour everything.

| Token            | Value     | Usage                    |
| ---------------- | --------- | ------------------------ |
| `--brand`        | `#7c3aed` | Primary accent           |
| `--brand-strong` | `#6d28d9` | Hover / “watched” state  |
| `--page-bg`      | `#f0e8ff` | Page background          |
| `--ink`          | `#1a0a2e` | Headings & primary text  |
| `--muted`        | `#6b7280` | Secondary text           |

Fonts: **Instrument Serif** (headings), **Montserrat** (body), **Odibee Sans** (numbers), **Kalam / Playpen** (handwritten notes).

---

## 🔒 Privacy

No accounts, no tracking, no backend. Your watched list lives only in your
browser's `localStorage`. The TMDB key is used client-side purely to read public
movie data.

---

<div align="center">

<br />

Made with 💜 by **Kausar** — _time is the one currency with no change back._

</div>
