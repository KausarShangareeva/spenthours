import { useState } from 'react';
import { Star } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { HOBBIES, levelOf } from './hobbies';
import s from './AnalyticsDialog.module.css';

const STORAGE_KEY = 'spenthours_interests';

export function AnalyticsDialog({ totalMinutes, onClose }: { totalMinutes: number; onClose: () => void }) {
  const h = Math.max(0, Math.round(totalMinutes / 60));
  const [picked, setPicked] = useState<Set<string>>(() => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const valid = saved.filter(id => HOBBIES.some(x => x.id === id));
      return new Set(valid.length ? valid : HOBBIES.map(x => x.id));
    } catch { return new Set(HOBBIES.map(x => x.id)); }
  });

  const toggle = (id: string) => setPicked(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(n))); } catch {}
    return n;
  });

  const cards = HOBBIES.filter(x => picked.has(x.id));

  return (
    <Modal onClose={onClose} maxWidth={1000}>
      <header className={s.header}>
        <p className={s.eyebrow}>✨ Your time, translated</p>
        <div className={s.bigRow}>
          <span className={s.big}>{h.toLocaleString()}</span>
          <span className={s.bigUnit}>hours on screen</span>
        </div>
        <p className={s.lede}>Pick a hobby below to see what those hours could have become.</p>
      </header>

      <div className={s.picker}>
        {HOBBIES.map(x => (
          <button key={x.id} onClick={() => toggle(x.id)} className={`${s.pick} ${picked.has(x.id) ? s.pickOn : ''}`}>
            <span>{x.emoji}</span>{x.label.replace(' level', '').replace(' practice', '')}
          </button>
        ))}
      </div>

      <div className={s.grid}>
        {cards.length === 0 && <div className={s.empty}>Pick a hobby above to see your potential ↑</div>}
        {cards.map(x => {
          const a = x.compute(h);
          const isCareer = x.kind === 'career';
          const lvl = levelOf(a.bar);
          return (
            <div key={x.id} className={s.card}>
              <div className={s.cardTop}>
                <span className={s.badge} style={{ background: x.bg }}>{x.emoji}</span>
                <span className={s.label}>{x.label}</span>
              </div>
              <div className={s.value}>
                {typeof a.value === 'number' ? a.value.toLocaleString() : a.value}
                {a.unit && <span className={s.unit}>{a.unit}</span>}
              </div>
              <div className={s.hint}>{a.hint}</div>
              <div className={s.barRow}>
                <div className={s.track}><div className={s.fill} style={{ width: `${a.bar}%`, background: isCareer ? lvl.color : 'var(--brand)' }} /></div>
                {isCareer && <Star size={13} color={lvl.color} fill={lvl.name === 'Senior' ? lvl.color : 'none'} strokeWidth={2.2} />}
              </div>
              <div className={s.footRow}>
                {isCareer && <span className={s.level} style={{ color: lvl.color }}>{lvl.name}</span>}
                {a.chips?.map((src, j) => <img key={j} src={src} alt="" className={s.chipIcon} />)}
              </div>
            </div>
          );
        })}
      </div>

      <p className={s.foot}>💛 Movies are wonderful. Time is the one currency with no change back.</p>
    </Modal>
  );
}
