import { cn } from '@/lib/utils';

/** Back-to-front layer offsets and colors: cyan, pink, indigo. */
const LAYERS: ReadonlyArray<readonly [number, number, string]> = [
  [4, 4, '#22D3EE'],
  [2, 2, '#F472B6'],
  [0, 0, '#7170FF'],
];

/** Letterform scale inside the 64×64 tile; offsets place the layered glyph centered. */
const SCALE = 1.1;
const OFFSET_X = 17.9;
const OFFSET_Y = 8.55;

/**
 * Peon logo mark: three layered lowercase "p" strokes (cyan, pink, indigo)
 * offset diagonally on a rounded near-black tile. Same artwork as
 * public/favicon.svg and the exported assets under public/logos.
 */
export function LogoMark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0A0A0A" />
      <g transform={`translate(${OFFSET_X} ${OFFSET_Y}) scale(${SCALE})`}>
        {LAYERS.map(([dx, dy, stroke]) => (
          <g
            key={stroke}
            transform={`translate(${dx / SCALE} ${dy / SCALE})`}
            fill="none"
            stroke={stroke}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0 V39" />
            <circle cx="11" cy="11" r="11" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight">Peon</span>
    </span>
  );
}
