import { HERO_POSTERS } from '@/lib/heroPosters';

// Book covers — Open Library, keyed by ISBN (self-development · business · psychology)
const B = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
export const BOOK_COVERS = [
  B('9780735211292'), B('9780374533557'), B('9780857197689'), B('9781612680194'),
  B('9780671027032'), B('9781455586691'), B('9780345472328'), B('9781501111105'),
  B('9780807014295'), B('9780812981605'), B('9781591846444'), B('9780804139298'),
  B('9780307887894'), B('9780061241895'), B('9780307352156'), B('9781451639612'),
  B('9780316017930'), B('9781594484803'),
];

export const MOVIE_POSTERS = HERO_POSTERS;
export const AVATAR_URL = '/avatar.png';

export const MOVIE_LABELS = [
  '1.7h watched', '2.5h watched', '1.8h watched', '1.9h watched', '1.7h watched',
  '2.2h watched', '1.6h watched', '2h watched', '2.5h watched', '3h watched',
  '2.1h watched', '3h watched', '2.5h watched', '2.6h watched', '1.4h watched',
  '2.5h watched', '3.4h watched', '3h watched', '3h watched', '1.7h watched',
  '2.1h watched', '1.9h watched', '2.8h watched', '2.3h watched', '1.5h watched',
  '2.7h watched', '3.2h watched', '1.8h watched', '2.4h watched', '2.9h watched',
];

export const BOOK_LABELS = [
  '5h read', '6h read', '20h read', '12h read', '8h read', '5h read', '7h read',
  '7h read', '6h read', '8h read', '15h read', '14h read', '8h read', '6h read',
  '7h read', '8h read', '9h read', '6h read', '10h read', '11h read', '13h read',
  '9h read', '7h read', '8h read', '6h read', '10h read', '12h read', '5h read',
  '8h read', '9h read',
];

export const LEFT_COLS = [
  { labels: MOVIE_LABELS.slice(0, 10), images: MOVIE_POSTERS.slice(0, 10), dur: 20 },
  { labels: MOVIE_LABELS.slice(10, 20), images: MOVIE_POSTERS.slice(10, 20), dur: 26, rev: true },
  { labels: MOVIE_LABELS.slice(20, 30), images: MOVIE_POSTERS.slice(20, 30), dur: 23 },
];
export const RIGHT_COLS = [
  { labels: BOOK_LABELS.slice(0, 10), images: BOOK_COVERS.slice(0, 4), dur: 22 },
  { labels: BOOK_LABELS.slice(10, 20), images: BOOK_COVERS.slice(4, 8), dur: 28, rev: true },
  { labels: BOOK_LABELS.slice(20, 30), images: BOOK_COVERS.slice(8, 12), dur: 25 },
];

export const HOW_STEPS = [
  { num: '01', title: 'Mark what you watched', desc: 'Pick titles from a curated catalog. One click per movie. No accounts, no setup — everything saves to your browser.' },
  { num: '02', title: 'See the real number', desc: 'SpentHours converts runtimes into hours, days and weeks of life. The mirror is honest.' },
  { num: '03', title: 'Compare to what could be', desc: 'Those hours, translated into books read, courses finished, skills learned. Not shame — perspective.' },
];

export const SOCIALS = [
  { href: 'https://www.linkedin.com/in/kausar-s-312a8b27a/', bg: '#0077b5', kind: 'linkedin' as const },
  { href: 'https://github.com/KausarShangareeva', bg: '#1a0a2e', kind: 'github' as const },
  { href: 'mailto:kausyarsh@gmail.com', bg: '#ea4335', kind: 'mail' as const },
];
