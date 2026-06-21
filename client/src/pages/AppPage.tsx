import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { toast } from 'sonner';
import { useShelf } from '@/hooks/useShelf';
import { useRuntimes } from '@/hooks/useRuntimes';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { runtimeOf, GENRES, TYPES, type TItem } from '@/lib/tmdb';
import { Chip } from '@/components/ui/Chip';
import { PosterCard } from '@/components/ui/PosterCard';
import { Loader } from '@/components/ui/Loader';
import { CatalogHeader } from '@/features/catalog/CatalogHeader';
import { useCatalog } from '@/features/catalog/useCatalog';
import { SimilarDialog } from '@/features/similar/SimilarDialog';
import { AnalyticsDialog } from '@/features/analytics/AnalyticsDialog';
import s from './AppPage.module.css';

export default function AppPage() {
  const { watchedIds, addToShelf, removeFromShelf, patchShelf, shelf, totalMinutes, count } = useShelf();

  const [tab, setTab] = useState<'all' | 'watched'>('all');
  const [type, setType] = useState('all');
  const [genre, setGenre] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [similarItem, setSimilarItem] = useState<TItem | null>(null);

  useEffect(() => { const t = setTimeout(() => setDebounced(query.trim()), 350); return () => clearTimeout(t); }, [query]);

  const { items, loading, hasMore, loadMore } = useCatalog(type, genre, debounced, tab === 'all');
  useInfiniteScroll(loadMore, tab === 'all' && hasMore);

  const hours = Math.round(totalMinutes / 60);
  const days = (totalMinutes / 60 / 24).toFixed(1);

  // add to shelf, then backfill the precise runtime for an accurate hour total
  const addWatched = useCallback((it: TItem) => {
    if (watchedIds.has(it.id)) return;
    addToShelf([{ movie_id: it.id, title: it.title, year: it.year ?? undefined, runtime: it.runtime, poster_url: it.poster ?? undefined, kind: it.kind }]);
    runtimeOf(it.media, it.tmdbId).then(rt => patchShelf(it.id, { runtime: rt })).catch(() => {});
  }, [watchedIds, addToShelf, patchShelf]);

  const handleCardClick = useCallback((it: TItem) => {
    if (watchedIds.has(it.id)) { removeFromShelf(it.id); return; }
    addWatched(it);
    toast.success('Added to your shelf');
    setSimilarItem(it);
  }, [watchedIds, removeFromShelf, addWatched]);

  const shelfItems: TItem[] = useMemo(() => shelf.map(it => ({
    id: it.movie_id,
    tmdbId: Number(it.movie_id.split('-')[1]) || 0,
    media: (it.movie_id.startsWith('tv-') ? 'tv' : 'movie') as 'movie' | 'tv',
    title: it.title || 'Untitled',
    year: it.year ?? null,
    poster: it.poster_url || null,
    runtime: it.runtime,
    kind: (it.kind as TItem['kind']) || 'movie',
    emoji: '🎬',
    genreIds: [],
  })).reverse(), [shelf]);

  const gridItems = useRuntimes(tab === 'watched' ? shelfItems : items);

  return (
    <div className={s.page}>
      <CatalogHeader count={count} hours={hours} days={days} onAnalytics={() => setShowAnalytics(true)} />

      <main className={s.main}>
        <div className={s.heading}>
          <h1 className={s.h1}>Pick the titles you've watched</h1>
          <p className={s.tagline}>…and see exactly how many hours of your life they took.</p>
        </div>

        <div className={s.searchWrap}>
          <Search size={16} className={s.searchIcon} />
          <input
            className={s.search}
            type="text"
            placeholder="Search any movie or show…"
            value={query}
            onChange={e => { setQuery(e.target.value); if (tab !== 'all') setTab('all'); }}
          />
          {query && <button className={s.clear} onClick={() => setQuery('')}><X size={16} /></button>}
        </div>

        <div className={`${s.row} ${s.tabs}`}>
          <Chip size="lg" active={tab === 'all'} onClick={() => setTab('all')}>Catalog</Chip>
          <Chip size="lg" active={tab === 'watched'} onClick={() => setTab('watched')}>My shelf ({count})</Chip>
        </div>

        {tab === 'all' && !debounced && (
          <>
            <div className={`${s.row} ${s.types}`}>
              <Chip active={type === 'all'} onClick={() => setType('all')}>✨ All types</Chip>
              {TYPES.map(t => <Chip key={t.id} active={type === t.id} onClick={() => setType(t.id)}>{t.emoji} {t.label}</Chip>)}
            </div>
            <div className={`${s.row} ${s.genres}`}>
              <Chip size="sm" active={genre === 'all'} onClick={() => setGenre('all')}>All genres</Chip>
              {GENRES.map(g => <Chip key={g.label} size="sm" active={genre === g.gid} onClick={() => setGenre(g.gid)}>{g.label}</Chip>)}
            </div>
          </>
        )}

        {gridItems.length === 0 && !loading ? (
          <div className={s.empty}>
            {tab === 'watched' ? 'Your shelf is empty — mark some titles from the catalog.' : 'Nothing found. Try another search or filter.'}
          </div>
        ) : (
          <div className={s.grid}>
            {gridItems.map(it => (
              <PosterCard key={it.id} item={it} watched={watchedIds.has(it.id)} onClick={() => handleCardClick(it)} />
            ))}
          </div>
        )}

        {tab === 'all' && loading && <Loader label="Loading…" />}
        <div className={s.spacer} />
      </main>

      {showAnalytics && <AnalyticsDialog totalMinutes={totalMinutes} onClose={() => setShowAnalytics(false)} />}
      {similarItem && <SimilarDialog item={similarItem} watchedIds={watchedIds} onMark={addWatched} onClose={() => setSimilarItem(null)} />}
    </div>
  );
}
