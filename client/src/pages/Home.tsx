import { useState } from 'react';
import { ProfileDialog } from '@/features/onboarding/ProfileDialog';
import { Hero } from '@/features/home/sections/Hero';
import { MobileMovieRow, MobileBookRow } from '@/features/home/sections/MobileRows';
import { HowItWorks } from '@/features/home/sections/HowItWorks';
import { CtaBanner } from '@/features/home/sections/CtaBanner';
import { AuthorNote } from '@/features/home/sections/AuthorNote';
import '@/features/home/home.css';

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);
  const start = () => setShowProfile(true);

  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <MobileMovieRow />
      <Hero onStart={start} />
      <MobileBookRow />
      <HowItWorks />
      <CtaBanner onStart={start} />
      <AuthorNote />
      {showProfile && <ProfileDialog onClose={() => setShowProfile(false)} />}
    </div>
  );
}
