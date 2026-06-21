import type { ReactNode } from 'react';
import s from './PillButton.module.css';

interface PillButtonProps {
  variant?: 'primary' | 'dark' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export function PillButton({ variant = 'primary', onClick, disabled, children }: PillButtonProps) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${s.btn} ${s[variant]}`}>
      {children}
    </button>
  );
}
