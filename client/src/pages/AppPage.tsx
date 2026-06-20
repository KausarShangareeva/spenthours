import { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, X, BookOpen, Clock4, Film, BarChart2, Check, Languages, Code2, Dumbbell, Plane, BookMarked } from 'lucide-react';
import { Link } from 'wouter';
import { Logo } from '@/components/Logo';
import { useShelf } from '@/hooks/useShelf';
import { MOVIES, GENRES, TYPES, Movie, getPoster, formatRuntime } from '@/lib/moviesData';
import { toast } from 'sonner';

// ── Interests from profile ────────────────────────────────────────────────
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const PROG_LANGS = [
  { name: 'HTML & CSS', hours: 80, icon: `${CDN}/html5/html5-original.svg` },
  { name: 'Python', hours: 200, icon: `${CDN}/python/python-original.svg` },
  { name: 'JavaScript', hours: 400, icon: `${CDN}/javascript/javascript-original.svg` },
  { name: 'SQL', hours: 600, icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: 'TypeScript', hours: 850, icon: `${CDN}/typescript/typescript-original.svg` },
  { name: 'React', hours: 1100, icon: `${CDN}/react/react-original.svg` },
];

function getLanguageLevel(hours: number): string {
  if (hours >= 900) return 'B2 — interviews & work';
  if (hours >= 400) return 'B1 — movies without subtitles';
  if (hours >= 150) return 'A2 — simple conversations';
  if (hours >= 50) return 'A1 — confident first steps';
  return 'First words & greetings';
}

function getProjectsShipped(hours: number): string {
  if (hours >= 1000) return '8 shippable projects';
  if (hours >= 600) return '5 small projects';
  if (hours >= 300) return '3 projects';
  if (hours >= 150) return '2 projects';
  if (hours >= 50) return '1 project';
  return 'Not yet — keep going!';
}

// ── Analytics Panel ───────────────────────────────────────────────────────
function AnalyticsPanel({ totalMinutes, onClose }: { totalMinutes: number; onClose: () => void }) {
  const totalHours = Math.max(0, Math.round(totalMinutes / 60));
  const interests: string[] = JSON.parse(localStorage.getItem('spenthours_interests') || '[]');

  const items = [
    ...(interests.includes('books') || interests.length === 0 ? [{
      icon: <BookOpen size={20} />,
      label: 'Books read',
      value: `${Math.floor(totalHours / 10)}`,
      hint: '≈ 10 hours per book',
      color: '#1e40af', bg: '#dbeafe',
    }] : []),
    ...(interests.includes('english') || interests.length === 0 ? [{
      icon: <Languages size={20} />,
      label: 'English level',
      value: getLanguageLevel(totalHours),
      hint: 'Daily immersion equivalent',
      color: '#065f46', bg: '#d1fae5',
    }] : []),
    ...(interests.includes('spanish') ? [{
      icon: <Languages size={20} />,
      label: 'Spanish level',
      value: getLanguageLevel(Math.floor(totalHours * 0.75)),
      hint: 'Slightly slower than English',
      color: '#92400e', bg: '#fde68a',
    }] : []),
    ...(interests.includes('programming') || interests.length === 0 ? [{
      icon: <Code2 size={20} />,
      label: 'Programming',
      value: (() => {
        const unlocked = PROG_LANGS.filter(l => totalHours >= l.hours);
        return unlocked.length ? `${unlocked.length} ${unlocked.length === 1 ? 'language' : 'languages'}` : 'First steps';
      })(),
      hint: (() => {
        const unlocked = PROG_LANGS.filter(l => totalHours >= l.hours);
        return unlocked.length ? unlocked.map(l => l.name).join(' · ') : 'Start with HTML & CSS';
      })(),
      chips: PROG_LANGS.filter(l => totalHours >= l.hours).slice(0, 6).map(l => l.icon),
      color: '#4c1d95', bg: '#ede9fe',
    }] : []),
    ...(interests.includes('design') ? [{
      icon: <BookMarked size={20} />,
      label: 'UI/UX Design',
      value: totalHours >= 500 ? 'Senior level' : totalHours >= 200 ? 'Mid level' : totalHours >= 80 ? 'Junior level' : 'Beginner',
      hint: totalHours >= 200 ? 'Could work on real products' : 'Keep practising Figma',
      color: '#9d174d', bg: '#fce7f3',
    }] : []),
    ...(interests.includes('fitness') ? [{
      icon: <Dumbbell size={20} />,
      label: 'Workouts',
      value: `${Math.floor(totalHours / 1)}`,
      hint: '≈ 1 hour each',
      color: '#065f46', bg: '#bbf7d0',
    }] : []),
    ...(interests.includes('music') ? [{
      icon: <BookMarked size={20} />,
      label: 'Music practice',
      value: totalHours >= 300 ? 'Intermediate' : totalHours >= 100 ? 'Beginner+' : 'First chords',
      hint: '≈ 10,000h to mastery',
      color: '#7c2d12', bg: '#fed7aa',
    }] : []),
    {
      icon: <Plane size={20} />,
      label: 'Long-haul flights',
      value: `${Math.floor(totalHours / 10)}`,
      hint: '≈ 10 hours each',
      color: '#1e3a5f', bg: '#bfdbfe',
    },
  ];

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(26,10,46,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 28, maxWidth: 560, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(26,10,46,0.2)', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: '#f3f4f6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          <X size={18} />
        </button>

        <div style={{ padding: '32px 32px 8px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#7c3aed', textTransform: 'uppercase', marginBottom: 6 }}>Your time, translated</p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, fontWeight: 400, color: '#1a0a2e', margin: '0 0 6px' }}>
            {totalHours.toLocaleString()} hours
          </h2>
          <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 24px' }}>
            Here's what that time could have bought you — no shame, just perspective.
          </p>
        </div>

        <div style={{ padding: '0 24px 24px' }}>
          <div style={{ borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 20px', borderBottom: idx < items.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, fontWeight: 400, color: '#1a0a2e', lineHeight: 1.3 }}>{item.value}</div>
                  {item.hint && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{item.hint}</div>}
                  {item.chips && item.chips.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                      {item.chips.map((src, i) => <img key={i} src={src} alt="" style={{ width: 20, height: 20 }} />)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 16 }}>
            💛 Movies are wonderful. Time is the one currency with no change back.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Movie Card ────────────────────────────────────────────────────────────
function MovieCard({ movie, watched, onClick }: { movie: Movie; watched: boolean; onClick: () => void }) {
  const poster = getPoster(movie.id);
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        borderRadius: 12, overflow: 'hidden', border: 'none',
        background: '#1a1a2e', cursor: 'pointer', textAlign: 'left',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        outline: watched ? '3px solid #e07b6a' : 'none',
        outlineOffset: 2,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.02)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
    >
      {/* Poster */}
      <div style={{ position: 'relative', aspectRatio: '2/3', width: '100%', overflow: 'hidden' }}>
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
            onError={e => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              const parent = img.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #d4c5f9, #c0e8ff)';
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                parent.style.fontSize = '32px';
                parent.textContent = movie.emoji;
              }
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #d4c5f9, #c0e8ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
            {movie.emoji}
          </div>
        )}
        {/* Title overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', padding: '24px 8px 8px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.3, wordBreak: 'break-word' }}>{movie.title}</p>
        </div>
        {/* Watched check */}
        {watched && (
          <div style={{ position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: '50%', background: '#e07b6a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={14} color="white" strokeWidth={3} />
          </div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: '6px 8px 8px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#e5e7eb', margin: '0 0 2px', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{movie.title}</p>
        <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>{movie.year} · {formatRuntime(movie.runtime)}</p>
      </div>
    </button>
  );
}

// ── Main App Page ─────────────────────────────────────────────────────────
type TabType = 'all' | 'watched';

export default function AppPage() {
  const { watchedIds, addToShelf, removeFromShelf, totalMinutes, count } = useShelf();
  const [tab, setTab] = useState<TabType>('all');
  const [kindFilter, setKindFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);

  const hours = Math.round(totalMinutes / 60);
  const days = (totalMinutes / 60 / 24).toFixed(1);

  const handleToggle = useCallback((movie: Movie) => {
    if (watchedIds.has(movie.id)) {
      removeFromShelf(movie.id);
    } else {
      addToShelf([{ movie_id: movie.id, title: movie.title, year: movie.year, runtime: movie.runtime, poster_url: getPoster(movie.id), kind: movie.kind }]);
      toast.success('Added to your shelf');
    }
  }, [watchedIds, addToShelf, removeFromShelf]);

  const filteredMovies = useMemo(() => {
    let list: Movie[] = tab === 'watched' ? MOVIES.filter(m => watchedIds.has(m.id)) : MOVIES;
    if (kindFilter !== 'all') list = list.filter(m => m.kind === kindFilter);
    if (genreFilter !== 'all') list = list.filter(m => m.tags.some(t => t.toLowerCase() === genreFilter.toLowerCase()));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m => m.title.toLowerCase().includes(q) || m.year.toString().includes(q));
    }
    return list;
  }, [tab, kindFilter, genreFilter, search, watchedIds]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fef3c7 0%, #fde8d8 40%, #fce7f3 100%)', fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 12, padding: '10px 24px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Logo size={30} />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: '#1a0a2e' }}>Spent<em style={{ fontStyle: 'italic', color: '#7c3aed' }}>Hours</em></span>
          </Link>

          {/* Stats pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <StatBadge icon={<Film size={14} />} label="WATCHED" value={`${count}`} bg="#c8f5d0" />
            <StatBadge icon={<Clock4 size={14} />} label="SPENT" value={`${hours}h`} bg="#c0e8ff" />
            <StatBadge icon={<BookOpen size={14} />} label="DAYS" value={days} bg="#d4c5f9" />
            <button
              onClick={() => setShowAnalytics(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#fff3b0', border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 100, padding: '6px 14px',
                fontSize: 11, fontWeight: 800, letterSpacing: '0.08em',
                cursor: 'pointer', color: '#1a0a2e', textTransform: 'uppercase',
                transition: 'brightness 0.15s',
              }}
            >
              <BarChart2 size={14} />
              ANALYTICS
            </button>
          </div>
          <span />
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Odibee Sans', sans-serif", fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: '#1a0a2e', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
            Pick the titles you've watched
          </h1>
          <p style={{ fontSize: 16, color: '#6b7280', margin: 0 }}>…and see exactly how many hours of your life they took.</p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto 24px' }}>
          <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search any movie or show…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '14px 44px', borderRadius: 100,
              border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)',
              fontSize: 15, outline: 'none', boxSizing: 'border-box',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Catalog / Shelf tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          <TabBtn active={tab === 'all'} onClick={() => setTab('all')} activeColor="#e07b6a">Catalog</TabBtn>
          <TabBtn active={tab === 'watched'} onClick={() => setTab('watched')} activeColor="#e07b6a">My shelf ({count})</TabBtn>
        </div>

        {/* Type filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          <FilterChip active={kindFilter === 'all'} onClick={() => setKindFilter('all')}>✨ All types</FilterChip>
          {TYPES.map(t => (
            <FilterChip key={t.id} active={kindFilter === t.id} onClick={() => setKindFilter(t.id)}>
              {t.emoji} {t.label}
            </FilterChip>
          ))}
        </div>

        {/* Genre filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginBottom: 24, opacity: 0.8 }}>
          <FilterChip active={genreFilter === 'all'} onClick={() => setGenreFilter('all')} small>All genres</FilterChip>
          {GENRES.map(g => (
            <FilterChip key={g} active={genreFilter === g} onClick={() => setGenreFilter(g)} small>{g}</FilterChip>
          ))}
        </div>

        {/* Grid */}
        {filteredMovies.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '48px 0', fontSize: 15 }}>
            Nothing found. Clear filters or use the search above ↑
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} watched={watchedIds.has(movie.id)} onClick={() => handleToggle(movie)} />
            ))}
          </div>
        )}
        <div style={{ height: 48 }} />
      </main>

      {showAnalytics && <AnalyticsPanel totalMinutes={totalMinutes} onClose={() => setShowAnalytics(false)} />}
    </div>
  );
}

// ── Small components ──────────────────────────────────────────────────────
function StatBadge({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string; bg: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: bg, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 100, padding: '6px 14px' }}>
      <span style={{ opacity: 0.7 }}>{icon}</span>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.6, textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontFamily: "'Odibee Sans', sans-serif", fontSize: 15, fontWeight: 900 }}>{value}</span>
    </div>
  );
}

function TabBtn({ active, onClick, children, activeColor = '#7c3aed' }: { active: boolean; onClick: () => void; children: React.ReactNode; activeColor?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 22px', borderRadius: 100, fontSize: 14, fontWeight: 700,
        border: active ? 'none' : '1px solid rgba(0,0,0,0.12)',
        background: active ? activeColor : 'rgba(255,255,255,0.8)',
        color: active ? 'white' : '#374151',
        cursor: 'pointer', transition: 'all 0.15s',
        boxShadow: active ? `0 4px 16px ${activeColor}44` : 'none',
      }}
    >
      {children}
    </button>
  );
}

function FilterChip({ active, onClick, children, small }: { active: boolean; onClick: () => void; children: React.ReactNode; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: small ? '5px 12px' : '7px 16px',
        borderRadius: 100,
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        border: active ? 'none' : '1px solid rgba(0,0,0,0.1)',
        background: active ? '#e07b6a' : 'rgba(255,255,255,0.75)',
        color: active ? 'white' : '#374151',
        cursor: 'pointer', transition: 'all 0.15s',
        boxShadow: active ? '0 3px 10px rgba(224,123,106,0.35)' : 'none',
      }}
    >
      {children}
    </button>
  );
}
