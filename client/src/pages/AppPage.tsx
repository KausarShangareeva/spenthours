import { useState, useMemo, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { MovieCard } from '@/components/MovieCard';
import { AnalyticsPanel } from '@/components/AnalyticsPanel';
import { useShelf } from '@/hooks/useShelf';
import { MOVIES, GENRES, TYPES, Movie, getPoster } from '@/lib/moviesData';
import { toast } from 'sonner';

type TabType = 'all' | 'watched';
type KindFilter = 'all' | string;

export default function AppPage() {
  const { shelf, watchedIds, addToShelf, removeFromShelf, toggleShelf, totalMinutes, count } = useShelf();

  const [tab, setTab] = useState<TabType>('all');
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleToggle = useCallback((movie: Movie) => {
    const isWatched = watchedIds.has(movie.id);
    if (isWatched) {
      removeFromShelf(movie.id);
    } else {
      addToShelf([{
        movie_id: movie.id,
        title: movie.title,
        year: movie.year,
        runtime: movie.runtime,
        poster_url: getPoster(movie.id),
        kind: movie.kind,
      }]);
      toast.success(`Added to your shelf`);
    }
  }, [watchedIds, addToShelf, removeFromShelf]);

  const filteredMovies = useMemo(() => {
    let list: Movie[] = tab === 'watched'
      ? MOVIES.filter(m => watchedIds.has(m.id))
      : MOVIES;

    if (kindFilter !== 'all') {
      list = list.filter(m => m.kind === kindFilter);
    }

    if (genreFilter !== 'all') {
      const g = genreFilter.toLowerCase();
      list = list.filter(m => m.tags.some(t => t.toLowerCase() === g));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.year.toString().includes(q)
      );
    }

    return list;
  }, [tab, kindFilter, genreFilter, search, watchedIds]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fef3c7 0%, #fde8d8 30%, #fce7f3 70%, #ede9fe 100%)' }}>
      <AppHeader
        count={count}
        totalMinutes={totalMinutes}
        onAnalytics={() => setShowAnalytics(true)}
      />

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-black sm:text-4xl">
            Pick the titles you've watched
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            …and see exactly how many hours of your life they took.
          </p>
        </div>

        {/* Search */}
        <div className="mt-5">
          <div className="relative mx-auto max-w-3xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search any movie or show…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white/80 py-3 pl-10 pr-10 text-sm shadow-sm backdrop-blur-sm outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-200 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Catalog / My shelf tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <TabBtn active={tab === 'all'} onClick={() => setTab('all')}>
            Catalog
          </TabBtn>
          <TabBtn active={tab === 'watched'} onClick={() => setTab('watched')}>
            My shelf ({count})
          </TabBtn>
        </div>

        {/* Type filters */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <FilterBtn active={kindFilter === 'all'} onClick={() => setKindFilter('all')}>
            ✨ All types
          </FilterBtn>
          {TYPES.map(t => (
            <FilterBtn
              key={t.id}
              active={kindFilter === t.id}
              onClick={() => setKindFilter(t.id)}
            >
              {t.emoji} {t.label}
            </FilterBtn>
          ))}
        </div>

        {/* Genre filters */}
        <div className="mt-2 flex flex-wrap justify-center gap-1.5 opacity-70">
          <FilterBtn active={genreFilter === 'all'} onClick={() => setGenreFilter('all')} subtle>
            All genres
          </FilterBtn>
          {GENRES.map(g => (
            <FilterBtn
              key={g}
              active={genreFilter === g}
              onClick={() => setGenreFilter(g)}
              subtle
            >
              {g}
            </FilterBtn>
          ))}
        </div>

        {/* Grid */}
        {filteredMovies.length === 0 ? (
          <div className="mt-12 text-center text-muted-foreground">
            Nothing found. Clear filters or use the search above ↑
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9">
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                watched={watchedIds.has(movie.id)}
                onClick={() => handleToggle(movie)}
                size="sm"
              />
            ))}
          </div>
        )}

        <div className="h-16" />
      </main>

      {/* Analytics Modal */}
      {showAnalytics && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowAnalytics(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-background shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAnalytics(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-card shadow-sm hover:bg-muted"
            >
              <X size={18} />
            </button>
            <AnalyticsPanel totalMinutes={totalMinutes} />
          </div>
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, children }: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-4 py-2 text-sm font-bold transition ${
        active
          ? 'border-transparent text-primary-foreground shadow-md'
          : 'border-border bg-card hover:bg-muted'
      }`}
      style={active ? { background: 'var(--primary)' } : undefined}
    >
      {children}
    </button>
  );
}

function FilterBtn({ active, onClick, children, subtle }: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border transition ${
        subtle
          ? 'px-2.5 py-1 text-[11px] font-semibold'
          : 'px-3 py-1.5 text-xs font-bold'
      } ${
        active
          ? 'border-transparent text-primary-foreground shadow-sm'
          : 'border-border bg-card hover:bg-muted'
      }`}
      style={active ? { background: 'var(--primary)' } : undefined}
    >
      {children}
    </button>
  );
}
