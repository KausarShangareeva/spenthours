import { Linkedin, Github, Mail } from 'lucide-react';
import { AVATAR_URL, SOCIALS } from '../heroData';

const ICONS = { linkedin: <Linkedin size={15} />, github: <Github size={15} />, mail: <Mail size={15} /> };
const hand = "'Playpen Sans', cursive";
const mark = { background: 'rgba(124,58,237,0.14)', color: '#5b21b6', padding: '0 6px', borderRadius: 4 } as const;
const bold = { fontWeight: 700, color: '#1a0a2e' } as const;

export function AuthorNote() {
  return (
    <section className="section-pad" style={{ padding: '60px 24px', background: 'linear-gradient(180deg, rgba(186,230,253,0.3) 0%, rgba(254,215,170,0.35) 100%)' }}>
      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        <div
          className="author-card"
          style={{ background: '#fffdf8', borderRadius: 18, padding: '48px 52px', border: '1px solid rgba(124,58,237,0.10)', boxShadow: '0 22px 55px rgba(26,10,46,0.12), 0 2px 6px rgba(26,10,46,0.05)', transform: 'rotate(-1.6deg)', transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0deg)'; e.currentTarget.style.boxShadow = '0 28px 70px rgba(26,10,46,0.15), 0 2px 6px rgba(26,10,46,0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(-1.6deg)'; e.currentTarget.style.boxShadow = '0 22px 55px rgba(26,10,46,0.12), 0 2px 6px rgba(26,10,46,0.05)'; }}
        >
          <h3 style={{ fontFamily: hand, fontSize: 30, color: '#1a0a2e', margin: 0, fontWeight: 600 }}>A note from the author</h3>
          <div style={{ width: 46, height: 2, background: 'var(--brand)', opacity: 0.45, borderRadius: 2, margin: '14px 0 24px' }} />

          <div style={{ fontFamily: hand, fontWeight: 100, fontSize: 18, color: '#3f3a47', lineHeight: 1.65 }}>
            <p style={{ margin: '0 0 16px' }}>
              The hours we spend on screens are <strong style={bold}>the quietest part of our week</strong>. We count steps, calories, sleep — but the biggest chunk of our time slips by without a number next to it. I wanted a <span style={mark}>small, honest mirror</span> for that.
            </p>
            <p style={{ margin: '0 0 16px' }}>
              SpentHours is that mirror. You mark the movies and shows you’ve watched, and the app gently translates those hours into something tangible — books you could have read, skills you could have learned, days of life lived a little differently. Not to shame anyone. Just to <strong style={bold}>make the invisible visible</strong>.
            </p>
            <p style={{ margin: '0 0 16px' }}>
              I built this as a self-initiated project to learn, to design something I’d actually want to use, and to share a piece of myself with you. There are no accounts, no tracking, no dark patterns — your data lives in your browser, and that’s it. <strong style={{ fontWeight: 700, color: 'var(--brand)' }}>Simple by choice.</strong>
            </p>
            <p style={{ margin: 0 }}>
              If SpentHours makes you <strong style={bold}>pause for even one evening</strong> and pick up something you’ve been putting off, <span style={mark}>that’s enough for me</span>.
            </p>
          </div>

          <div className="author-bottom" style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src={AVATAR_URL} alt="Kausar S." style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid rgba(124,58,237,0.25)', flexShrink: 0 }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: hand, fontWeight: 600, fontSize: 20, color: '#1a0a2e', lineHeight: 1.15 }}>With love, Kausar</div>
                <div style={{ fontFamily: hand, fontSize: 14, color: '#9ca3af', marginTop: 4 }}>Author of SpentHours</div>
              </div>
            </div>
            <div className="author-social-row" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
              {SOCIALS.map((soc, i) => (
                <a key={i} href={soc.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: soc.bg, color: 'white', textDecoration: 'none', flexShrink: 0, transition: 'opacity 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  {ICONS[soc.kind]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
