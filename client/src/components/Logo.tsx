export function Logo({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/spenthour_icon.svg"
      width={size}
      height={size}
      alt="SpentHours logo"
      style={{ display: 'block' }}
    />
  );
}
