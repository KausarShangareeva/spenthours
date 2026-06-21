import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { Modal } from '@/components/ui/Modal';
import s from './ProfileDialog.module.css';

interface Interest { id: string; emoji: string; label: string; description: string; color: string; bg: string; }

const INTERESTS: Interest[] = [
  { id: 'books', emoji: '📚', label: 'Reading books', description: '~10h per book', color: '#1e40af', bg: '#dbeafe' },
  { id: 'english', emoji: '🇬🇧', label: 'English', description: 'Daily immersion', color: '#065f46', bg: '#d1fae5' },
  { id: 'swedish', emoji: '🇸🇪', label: 'Swedish', description: 'A new language', color: '#1e40af', bg: '#dbeafe' },
  { id: 'programming', emoji: '💻', label: 'Programming', description: 'HTML → React → Go', color: '#4c1d95', bg: '#ede9fe' },
  { id: 'design', emoji: '🎨', label: 'UI/UX Design', description: 'Figma & product thinking', color: '#9d174d', bg: '#fce7f3' },
  { id: 'fitness', emoji: '🏋️', label: 'Fitness', description: '~1h per workout', color: '#065f46', bg: '#bbf7d0' },
  { id: 'meditation', emoji: '🧘', label: 'Meditation', description: 'Mindfulness practice', color: '#1e3a5f', bg: '#bfdbfe' },
  { id: 'music', emoji: '🎸', label: 'Music', description: 'Learning an instrument', color: '#7c2d12', bg: '#fed7aa' },
  { id: 'writing', emoji: '✍️', label: 'Writing', description: 'Essays, journaling', color: '#1f2937', bg: '#f3f4f6' },
];

export function ProfileDialog({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [, navigate] = useLocation();

  const toggle = (id: string) => setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const handleContinue = () => {
    localStorage.setItem('spenthours_interests', JSON.stringify(Array.from(selected)));
    onClose();
    navigate('/app');
  };

  return (
    <Modal onClose={onClose} maxWidth={560}>
      <div className={s.body}>
        <header className={s.header}>
          <p className={s.eyebrow}>Quick profile</p>
          <h2 className={s.title}>What would you do with those hours?</h2>
          <p className={s.lede}>Pick what matters to you. We'll show how much you could have achieved — not to judge, just to inspire.</p>
        </header>

        <div className={s.grid}>
          {INTERESTS.map(item => {
            const on = selected.has(item.id);
            return (
              <button key={item.id} onClick={() => toggle(item.id)} className={s.item}
                style={{ borderColor: on ? item.color : 'rgba(0,0,0,0.08)', background: on ? item.bg : 'rgba(255,255,255,0.8)', boxShadow: on ? `0 4px 16px ${item.color}22` : '0 1px 4px rgba(0,0,0,0.06)' }}>
                <span className={s.emoji}>{item.emoji}</span>
                <span className={s.text}>
                  <span className={s.itemLabel} style={{ color: on ? item.color : 'var(--ink)' }}>{item.label}</span>
                  <span className={s.itemDesc}>{item.description}</span>
                </span>
                {on && <span className={s.check} style={{ background: item.color }}><Check size={12} color="#fff" strokeWidth={3} /></span>}
              </button>
            );
          })}
        </div>

        <footer className={s.footer}>
          <p className={s.note}>{selected.size === 0 ? 'Select at least one to personalise your analysis' : `${selected.size} selected — great choice!`}</p>
          <button onClick={handleContinue} disabled={selected.size === 0} className={s.cta}>
            See my analysis<ArrowRight size={15} />
          </button>
        </footer>
      </div>
    </Modal>
  );
}
