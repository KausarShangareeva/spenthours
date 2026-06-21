import { Link } from 'wouter';
import { Film, Clock4, BookOpen, BarChart2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { StatBadge } from '@/components/ui/StatBadge';
import s from './CatalogHeader.module.css';

interface Props { count: number; hours: number; days: string; onAnalytics: () => void; }

export function CatalogHeader({ count, hours, days, onAnalytics }: Props) {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link to="/" className={s.brand}>
          <Logo size={42} />
          <span className={s.wordmark}>Spent<em>Hours</em></span>
        </Link>
        <div className={s.stats}>
          <StatBadge icon={<Film size={16} />} label="WATCHED" value={`${count}`} bg="#bbf0c6" />
          <StatBadge icon={<Clock4 size={16} />} label="SPENT" value={`${hours}h`} bg="#aaddff" />
          <StatBadge icon={<BookOpen size={16} />} label="DAYS" value={days} bg="#c9b4f7" />
          <button className={s.cta} onClick={onAnalytics}>
            <BarChart2 size={17} strokeWidth={2.5} />See my Analytics
          </button>
        </div>
        <span />
      </div>
    </header>
  );
}
