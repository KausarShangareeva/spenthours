import { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

interface Interest {
  id: string;
  emoji: string;
  label: string;
  description: string;
  color: string;
  bg: string;
}

const INTERESTS: Interest[] = [
  { id: 'books', emoji: '📚', label: 'Reading books', description: '~10h per book', color: '#1e40af', bg: '#dbeafe' },
  { id: 'english', emoji: '🇬🇧', label: 'English', description: 'Daily immersion', color: '#065f46', bg: '#d1fae5' },
  { id: 'spanish', emoji: '🇪🇸', label: 'Spanish', description: 'A new language', color: '#92400e', bg: '#fde68a' },
  { id: 'programming', emoji: '💻', label: 'Programming', description: 'HTML → React → Go', color: '#4c1d95', bg: '#ede9fe' },
  { id: 'design', emoji: '🎨', label: 'UI/UX Design', description: 'Figma & product thinking', color: '#9d174d', bg: '#fce7f3' },
  { id: 'fitness', emoji: '🏋️', label: 'Fitness', description: '~1h per workout', color: '#065f46', bg: '#bbf7d0' },
  { id: 'meditation', emoji: '🧘', label: 'Meditation', description: 'Mindfulness practice', color: '#1e3a5f', bg: '#bfdbfe' },
  { id: 'music', emoji: '🎸', label: 'Music', description: 'Learning an instrument', color: '#7c2d12', bg: '#fed7aa' },
  { id: 'writing', emoji: '✍️', label: 'Writing', description: 'Essays, journaling', color: '#1f2937', bg: '#f3f4f6' },
  { id: 'travel', emoji: '✈️', label: 'Travel prep', description: 'Planning & languages', color: '#065f46', bg: '#ecfdf5' },
];

interface ProfileModalProps {
  onClose: () => void;
}

export function ProfileModal({ onClose }: ProfileModalProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [, navigate] = useLocation();

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = () => {
    // Save profile to localStorage
    localStorage.setItem('spenthours_interests', JSON.stringify(Array.from(selected)));
    onClose();
    navigate('/app');
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(26,10,46,0.55)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #fdf4ff 0%, #f0f9ff 100%)',
          borderRadius: 28, padding: '36px 36px 32px',
          maxWidth: 560, width: '100%',
          boxShadow: '0 24px 80px rgba(26,10,46,0.22)',
          border: '1px solid rgba(255,255,255,0.9)',
          position: 'relative',
          maxHeight: '90vh', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,0,0,0.06)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#6b7280',
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#7c3aed', textTransform: 'uppercase', marginBottom: 8 }}>
            Quick profile
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400, color: '#1a0a2e', margin: '0 0 8px', lineHeight: 1.2 }}>
            What would you do with those hours?
          </h2>
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
            Pick what matters to you. We'll show how much you could have achieved — not to judge, just to inspire.
          </p>
        </div>

        {/* Interest grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
          {INTERESTS.map(item => {
            const isSelected = selected.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 14,
                  border: isSelected ? `2px solid ${item.color}` : '2px solid rgba(0,0,0,0.08)',
                  background: isSelected ? item.bg : 'rgba(255,255,255,0.8)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s ease',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isSelected ? `0 4px 16px ${item.color}22` : '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.emoji}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? item.color : '#1a0a2e', lineHeight: 1.2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{item.description}</div>
                </div>
                {isSelected && (
                  <div style={{
                    marginLeft: 'auto', flexShrink: 0,
                    width: 20, height: 20, borderRadius: '50%',
                    background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={12} color="white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>
            {selected.size === 0
              ? 'Select at least one to personalise your analysis'
              : `${selected.size} selected — great choice!`}
          </p>
          <button
            onClick={handleContinue}
            disabled={selected.size === 0}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: selected.size > 0 ? '#1a0a2e' : '#d1d5db',
              color: 'white', border: 'none', borderRadius: 100,
              padding: '12px 24px', fontSize: 14, fontWeight: 700,
              cursor: selected.size > 0 ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            See my analysis
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
