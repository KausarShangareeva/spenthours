// What the watched hours could have become — one definition per hobby.
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
export const PROG_LANGS = [
  { name: 'HTML & CSS', hours: 80, icon: `${CDN}/html5/html5-original.svg` },
  { name: 'Python', hours: 200, icon: `${CDN}/python/python-original.svg` },
  { name: 'JavaScript', hours: 400, icon: `${CDN}/javascript/javascript-original.svg` },
  { name: 'SQL', hours: 600, icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: 'TypeScript', hours: 850, icon: `${CDN}/typescript/typescript-original.svg` },
  { name: 'React', hours: 1100, icon: `${CDN}/react/react-original.svg` },
];

export function getLanguageLevel(h: number) {
  if (h >= 900) return 'B2 — interviews & work';
  if (h >= 400) return 'B1 — movies without subtitles';
  if (h >= 150) return 'A2 — simple conversations';
  if (h >= 50) return 'A1 — confident first steps';
  return 'First words & greetings';
}

export type Ach = { value: string | number; unit?: string; hint: string; bar: number; chips?: string[] };
export type Hobby = { id: string; emoji: string; label: string; bg: string; kind: 'career' | 'level' | 'count'; compute: (h: number) => Ach };

function nextGoal(n: number) {
  const steps = [5, 10, 25, 50, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000];
  for (const s of steps) if (s > n) return s;
  return Math.ceil((n + 1) / 1000) * 1000;
}
function milestone(count: number, unit: string): Ach {
  const goal = nextGoal(count);
  return { value: count, unit, hint: `${goal - count} more to reach ${goal}`, bar: Math.min(100, (count / goal) * 100) };
}

export function levelOf(pct: number) {
  if (pct >= 75) return { name: 'Senior', color: '#ef4444' };
  if (pct >= 40) return { name: 'Medium', color: '#22c55e' };
  return { name: 'Junior', color: '#f59e0b' };
}

export const HOBBIES: Hobby[] = [
  { id: 'books', emoji: '📚', label: 'Books read', bg: '#dbeafe', kind: 'count',
    compute: h => milestone(Math.floor(h / 10), 'books') },
  { id: 'english', emoji: '🇬🇧', label: 'English level', bg: '#d1fae5', kind: 'level',
    compute: h => ({ value: getLanguageLevel(h), hint: 'Daily immersion equivalent', bar: Math.min(100, (h / 900) * 100) }) },
  { id: 'swedish', emoji: '🇸🇪', label: 'Swedish level', bg: '#dbeafe', kind: 'level',
    compute: h => ({ value: getLanguageLevel(Math.floor(h * 0.85)), hint: 'A brand-new language', bar: Math.min(100, (h / 1100) * 100) }) },
  { id: 'programming', emoji: '💻', label: 'Programming', bg: '#ede9fe', kind: 'career',
    compute: h => {
      const u = PROG_LANGS.filter(l => h >= l.hours);
      return {
        value: u.length ? `${u.length} ${u.length === 1 ? 'language' : 'languages'}` : 'First steps',
        hint: u.length ? u.map(l => l.name).join(' · ') : 'Start with HTML & CSS',
        chips: u.slice(0, 6).map(l => l.icon), bar: Math.min(100, (h / 8000) * 100),
      };
    } },
  { id: 'design', emoji: '🎨', label: 'UI/UX Design', bg: '#fce7f3', kind: 'career',
    compute: h => ({
      value: h >= 4500 ? 'Ships real products' : h >= 2400 ? 'Strong mid-level' : h >= 600 ? 'Solid junior' : 'Just starting',
      hint: '≈ years of practice to senior', bar: Math.min(100, (h / 6000) * 100),
    }) },
  { id: 'fitness', emoji: '🏋️', label: 'Workouts', bg: '#bbf7d0', kind: 'count',
    compute: h => milestone(Math.floor(h), 'sessions') },
  { id: 'meditation', emoji: '🧘', label: 'Meditation', bg: '#bfdbfe', kind: 'level',
    compute: h => ({ value: h >= 1000 ? 'Deeply centred' : h >= 300 ? 'Steady practice' : 'Getting started', hint: '≈ daily 20-min sits', bar: Math.min(100, (h / 1000) * 100) }) },
  { id: 'music', emoji: '🎸', label: 'Music practice', bg: '#fed7aa', kind: 'level',
    compute: h => ({ value: h >= 4000 ? 'Plays confidently' : h >= 1500 ? 'Comfortable' : h >= 300 ? 'Knows the basics' : 'First chords', hint: '≈ 10,000h to mastery', bar: Math.min(100, (h / 4000) * 100) }) },
  { id: 'writing', emoji: '✍️', label: 'Writing', bg: '#f3f4f6', kind: 'level',
    compute: h => ({ value: h >= 1000 ? 'A finished book' : h >= 300 ? 'Many essays' : h >= 50 ? 'A short story' : 'First pages', hint: '≈ a whole book in ~1,000h', bar: Math.min(100, (h / 1000) * 100) }) },
];
