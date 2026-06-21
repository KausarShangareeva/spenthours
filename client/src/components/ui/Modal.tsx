import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import s from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  maxWidth?: number;
  showClose?: boolean;
}

export function Modal({ children, onClose, maxWidth = 700, showClose = true }: ModalProps) {
  return (
    <div className={s.overlay} onClick={onClose} role="presentation">
      <div
        className={s.card}
        style={{ maxWidth }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {showClose && (
          <button className={s.close} onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
