import { BookOpen, Languages, Code2, Dumbbell, Plane, Rocket } from 'lucide-react';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const PROG_LANGS = [
  { name: 'HTML & CSS', hours: 80, icon: `${CDN}/html5/html5-original.svg` },
  { name: 'Python', hours: 200, icon: `${CDN}/python/python-original.svg` },
  { name: 'JavaScript', hours: 400, icon: `${CDN}/javascript/javascript-original.svg` },
  { name: 'SQL', hours: 600, icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: 'TypeScript', hours: 850, icon: `${CDN}/typescript/typescript-original.svg` },
  { name: 'React', hours: 1100, icon: `${CDN}/react/react-original.svg` },
  { name: 'Go', hours: 1400, icon: `${CDN}/go/go-original-logo.svg` },
];

function getLanguageLevel(hours: number): string {
  if (hours >= 900) return 'B2 — interviews & work';
  if (hours >= 400) return 'B1 — movies without subtitles';
  if (hours >= 150) return 'A2 — simple conversations';
  if (hours >= 50) return 'A1 — confident first steps';
  return 'First words & greetings';
}

function getProjectsShipped(hours: number): string {
  if (hours >= 1000) return '8 shippable projects — a SaaS dashboard, a mobile app, a portfolio, a store…';
  if (hours >= 600) return '5 small projects — a blog, a todo app, a landing page, a portfolio, a tiny SaaS';
  if (hours >= 300) return '3 projects — a landing page, a todo app, a personal blog';
  if (hours >= 150) return '2 projects — a landing page and a simple web app';
  if (hours >= 50) return '1 project — a personal landing page';
  return 'Not yet — keep going!';
}

interface AnalyticsPanelProps {
  totalMinutes: number;
}

export function AnalyticsPanel({ totalMinutes }: AnalyticsPanelProps) {
  const totalHours = Math.max(0, Math.round(totalMinutes / 60));
  const booksRead = Math.floor(totalHours / 10);
  const unlockedLangs = PROG_LANGS.filter(l => totalHours >= l.hours);
  const workouts = Math.floor(totalHours / 1);
  const flights = Math.floor(totalHours / 10);

  const items = [
    {
      icon: <BookOpen size={20} />,
      label: 'Books read',
      value: `${booksRead}`,
      hint: '≈ 10 hours per book',
    },
    {
      icon: <Languages size={20} />,
      label: 'English level',
      value: getLanguageLevel(totalHours),
      hint: 'Daily immersion equivalent',
    },
    {
      icon: <Languages size={20} />,
      label: 'Swedish level',
      value: getLanguageLevel(Math.floor(totalHours * 0.75)),
      hint: 'Slightly slower than English',
    },
    {
      icon: <Code2 size={20} />,
      label: 'Programming',
      value: unlockedLangs.length
        ? `${unlockedLangs.length} ${unlockedLangs.length === 1 ? 'language' : 'languages'}`
        : 'First steps',
      hint: unlockedLangs.length
        ? unlockedLangs.map(l => l.name).join(' · ')
        : 'Start with HTML & CSS',
      iconChips: unlockedLangs.slice(0, 6).map(l => l.icon),
    },
    {
      icon: <Rocket size={20} />,
      label: 'Projects shipped',
      value: getProjectsShipped(totalHours),
    },
    {
      icon: <Dumbbell size={20} />,
      label: 'Workouts',
      value: `${workouts}`,
      hint: '≈ 1 hour each',
    },
    {
      icon: <Plane size={20} />,
      label: 'Long-haul flights',
      value: `${flights}`,
      hint: '≈ 10 hours each',
    },
  ];

  return (
    <section className="px-6 pb-10 pt-8 sm:px-10">
      <header className="mb-6 text-center">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Your time, translated
        </div>
        <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">
          {totalHours.toLocaleString()} hours
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Here's what that time could have bought you — no shame, just perspective.
        </p>
      </header>

      <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-4 px-5 py-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </div>
              <div className="mt-0.5 font-display text-lg font-black leading-tight">
                {item.value}
              </div>
              {item.hint && (
                <div className="mt-0.5 text-xs text-muted-foreground">{item.hint}</div>
              )}
              {item.iconChips && item.iconChips.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.iconChips.map((src, i) => (
                    <img key={i} src={src} alt="" className="h-5 w-5" />
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        💛 Movies are wonderful. Time is the one currency with no change back.
      </p>
    </section>
  );
}
