import type { ReactNode } from 'react';
import s from './Chip.module.css';

interface ChipProps {
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: ReactNode;
}

export function Chip({ active = false, size = 'md', onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${s.chip} ${s[size]} ${active ? s.active : ''}`}
    >
      {children}
    </button>
  );
}
