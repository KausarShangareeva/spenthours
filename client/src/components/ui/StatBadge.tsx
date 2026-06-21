import type { ReactNode } from 'react';
import s from './StatBadge.module.css';

export function StatBadge({ icon, label, value, bg }: { icon: ReactNode; label: string; value: string; bg: string }) {
  return (
    <div className={s.badge} style={{ background: bg }}>
      <span className={s.icon}>{icon}</span>
      <span className={s.label}>{label}</span>
      <span className={s.value}>{value}</span>
    </div>
  );
}
