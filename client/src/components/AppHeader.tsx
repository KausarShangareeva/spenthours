import { Link } from 'wouter';
import { Logo } from './Logo';
import { Film, Clock4, BookOpen, BarChart2 } from 'lucide-react';

interface AppHeaderProps {
  count: number;
  totalMinutes: number;
  onAnalytics: () => void;
}

export function AppHeader({ count, totalMinutes, onAnalytics }: AppHeaderProps) {
  const hours = Math.round(totalMinutes / 60);
  const days = (totalMinutes / 60 / 24).toFixed(1);

  return (
    <div className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" aria-label="Home">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="font-display text-lg font-black hidden sm:inline">SpentHours</span>
          </div>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <StatBadge
            icon={<Film size={16} />}
            label="Watched"
            value={`${count}`}
            bg="var(--mint)"
          />
          <StatBadge
            icon={<Clock4 size={16} />}
            label="Spent"
            value={`${hours}h`}
            bg="var(--sky)"
          />
          <StatBadge
            icon={<BookOpen size={16} />}
            label="Days"
            value={days}
            bg="var(--lavender)"
          />
          <button
            onClick={onAnalytics}
            className="flex items-center gap-2 rounded-2xl border border-border px-3 py-1.5 text-xs font-black uppercase tracking-wide shadow-sm transition hover:brightness-95"
            style={{ background: 'var(--butter)' }}
          >
            <BarChart2 size={16} />
            Analytics
          </button>
        </div>

        <span />
      </div>
    </div>
  );
}

function StatBadge({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-2xl border border-border px-3 py-1.5 shadow-sm"
      style={{ background: bg }}
    >
      <span className="opacity-80">{icon}</span>
      <span className="text-xs font-bold uppercase tracking-wide opacity-70">{label}</span>
      <span className="font-display text-base font-black">{value}</span>
    </div>
  );
}
