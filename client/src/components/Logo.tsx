export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Clock face */}
      <circle cx="16" cy="16" r="14" fill="#ffd6c0" stroke="#1a0a2e" strokeWidth="2" />
      {/* Clock hands */}
      <line x1="16" y1="16" x2="16" y2="7" stroke="#1a0a2e" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="16" x2="22" y2="20" stroke="#1a0a2e" strokeWidth="2.5" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="16" cy="16" r="2" fill="#1a0a2e" />
      {/* Film strip notch */}
      <rect x="6" y="5" width="3" height="2" rx="0.5" fill="#1a0a2e" opacity="0.5" />
      <rect x="23" y="5" width="3" height="2" rx="0.5" fill="#1a0a2e" opacity="0.5" />
    </svg>
  );
}
