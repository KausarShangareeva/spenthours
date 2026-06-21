// ── Live TMDB integration ───────────────────────────────────────────────────
// Search across ALL of TMDB, browse with real pagination, and pull genuine
// "recommendations" per title — same approach a Lovable-style app uses.

const KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE = 'https://api.themoviedb.org/3';
const IMG = 'https://image.tmdb.org/t/p/w342';

export type Media = 'movie' | 'tv';
export type Kind = 'movie' | 'animation' | 'series' | 'dorama' | 'anime';

export interface TItem {
  id: string;            // `${media}-${tmdbId}` — stable key for the shelf
  tmdbId: number;
  media: Media;
  title: string;
  year: number | null;
  poster: string | null;
  runtime?: number;      // filled lazily from the detail endpoint
  kind: Kind;
  emoji: string;
  genreIds: number[];
}

export interface Page { items: TItem[]; page: number; totalPages: number; }

const EMOJI: Record<Kind, string> = { movie: '🎬', animation: '🎈', series: '📺', dorama: '🌸', anime: '⛩️' };

// genre chips → TMDB genre id (movie ids; close-enough for tv)
export const GENRES: { label: string; gid: number }[] = [
  { label: 'Family', gid: 10751 },
  { label: 'Fairytale', gid: 14 },     // Fantasy
  { label: 'Musical', gid: 10402 },    // Music
  { label: 'Comedy', gid: 35 },
  { label: 'Romance', gid: 10749 },
  { label: 'Adventure', gid: 12 },
  { label: 'Fantasy', gid: 14 },
  { label: 'Sci-Fi', gid: 878 },
  { label: 'Action', gid: 28 },
  { label: 'Historical', gid: 36 },    // History
  { label: 'Drama', gid: 18 },
  { label: 'War', gid: 10752 },
  { label: 'Horror', gid: 27 },
];

export const TYPES: { id: string; label: string; emoji: string }[] = [
  { id: 'movie', label: 'Movies', emoji: '🎬' },
  { id: 'animation', label: 'Animation', emoji: '🎈' },
  { id: 'series', label: 'Series', emoji: '📺' },
  { id: 'dorama', label: 'K-Drama', emoji: '🌸' },
  { id: 'anime', label: 'Anime', emoji: '⛩️' },
];

export function formatRuntime(minutes: number): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

async function tmdb(path: string, params: Record<string, string | number> = {}) {
  const url = new URL(BASE + path);
  url.searchParams.set('api_key', KEY);
  url.searchParams.set('language', 'en-US');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}

function kindOf(r: any, media: Media): Kind {
  const g: number[] = r.genre_ids || (r.genres ? r.genres.map((x: any) => x.id) : []);
  const lang = r.original_language;
  if (media === 'movie') return g.includes(16) ? (lang === 'ja' ? 'anime' : 'animation') : 'movie';
  if (lang === 'ko') return 'dorama';
  if (lang === 'ja' && g.includes(16)) return 'anime';
  return 'series';
}

function mapItem(r: any, mediaOverride?: Media): TItem | null {
  const media: Media = (mediaOverride || r.media_type) as Media;
  if (media !== 'movie' && media !== 'tv') return null;
  if (!r.poster_path) return null;
  const title = r.title || r.name || 'Untitled';
  const date = r.release_date || r.first_air_date || '';
  const kind = kindOf(r, media);
  return {
    id: `${media}-${r.id}`,
    tmdbId: r.id,
    media,
    title,
    year: date ? Number(date.slice(0, 4)) || null : null,
    poster: r.poster_path ? IMG + r.poster_path : null,
    kind,
    emoji: EMOJI[kind],
    genreIds: r.genre_ids || [],
  };
}

const dedupe = (items: TItem[]) => {
  const seen = new Set<string>();
  return items.filter(i => (seen.has(i.id) ? false : (seen.add(i.id), true)));
};

// ── Browse / discover with real pagination ──────────────────────────────────
export async function discover(type: string, gid: number | null, page: number): Promise<Page> {
  let path: string;
  let params: Record<string, string | number> = { page };
  let media: Media | null = null;

  if (type === 'all' && !gid) {
    path = '/trending/all/week';
  } else if (type === 'all') {
    media = 'movie'; path = '/discover/movie';
    params = { ...params, sort_by: 'popularity.desc', 'vote_count.gte': 80, with_genres: String(gid) };
  } else if (type === 'movie') {
    media = 'movie'; path = '/discover/movie';
    params = { ...params, sort_by: 'popularity.desc', 'vote_count.gte': 80, without_genres: '16' };
    if (gid) params.with_genres = String(gid);
  } else if (type === 'animation') {
    media = 'movie'; path = '/discover/movie';
    params = { ...params, sort_by: 'popularity.desc', 'vote_count.gte': 40, with_genres: gid ? `16,${gid}` : '16' };
  } else if (type === 'series') {
    media = 'tv'; path = '/discover/tv';
    params = { ...params, sort_by: 'popularity.desc', 'vote_count.gte': 40 };
    if (gid) params.with_genres = String(gid);
  } else if (type === 'dorama') {
    media = 'tv'; path = '/discover/tv';
    params = { ...params, sort_by: 'popularity.desc', 'vote_count.gte': 10, with_original_language: 'ko' };
    if (gid) params.with_genres = String(gid);
  } else if (type === 'anime') {
    media = 'tv'; path = '/discover/tv';
    params = { ...params, sort_by: 'popularity.desc', 'vote_count.gte': 10, with_original_language: 'ja', with_genres: gid ? `16,${gid}` : '16' };
  } else {
    media = 'movie'; path = '/discover/movie';
  }

  const d = await tmdb(path, params);
  const items = dedupe((d.results || []).map((r: any) => mapItem(r, media || undefined)).filter(Boolean) as TItem[]);
  return { items, page: d.page || page, totalPages: Math.min(d.total_pages || 1, 500) };
}

// ── Search across all of TMDB ────────────────────────────────────────────────
export async function search(query: string, page: number): Promise<Page> {
  const d = await tmdb('/search/multi', { query, page, include_adult: 'false' });
  const items = dedupe((d.results || []).map((r: any) => mapItem(r)).filter(Boolean) as TItem[]);
  return { items, page: d.page || page, totalPages: Math.min(d.total_pages || 1, 500) };
}

// ── Real recommendations for a title ─────────────────────────────────────────
export async function recommendations(media: Media, tmdbId: number, page: number): Promise<Page> {
  const d = await tmdb(`/${media}/${tmdbId}/recommendations`, { page });
  const items = dedupe((d.results || []).map((r: any) => mapItem(r, media)).filter(Boolean) as TItem[]);
  return { items, page: d.page || page, totalPages: Math.min(d.total_pages || 1, 500) };
}

// Cache of resolved runtimes (id → minutes), shared across renders.
export const runtimeCache = new Map<string, number>();

// ── Runtime (minutes) — fetched when a title is added to the shelf ───────────
export async function runtimeOf(media: Media, tmdbId: number): Promise<number> {
  try {
    const d = await tmdb(`/${media}/${tmdbId}`);
    if (media === 'movie') return d.runtime || 110;
    const per = (d.episode_run_time && d.episode_run_time[0]) || 40;
    const eps = d.number_of_episodes || (d.number_of_seasons || 1) * 10;
    return Math.max(per * eps, per);
  } catch {
    return media === 'movie' ? 110 : 600;
  }
}
