import { cn } from '@/lib/utils';

const PROVIDERS = [
  { name: 'DigitalOcean', src: '/logos/providers/digitalocean-badge.svg', href: 'https://www.digitalocean.com/?refcode=37201cd07b6d&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge' },
  { name: 'Hetzner', src: '/logos/providers/hetzner.png', href: 'https://www.hetzner.com/cloud' },
  { name: 'AWS EC2', src: '/logos/providers/aws.png', href: 'https://aws.amazon.com/ec2/' },
] as const;

const OTHERS = ['Google Cloud', 'OVH', 'Contabo', 'Raspberry Pi', 'Bare metal'] as const;

/** Grayscale provider row. Any box with SSH and Docker works; these are the common ones. */
export function LogoCloud({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {PROVIDERS.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Deploy on ${p.name}`}
            className="opacity-50 grayscale transition hover:opacity-100 hover:grayscale-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- small static logos */}
            <img src={p.src} alt={p.name} className="h-8 w-auto sm:h-9" loading="lazy" />
          </a>
        ))}
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {OTHERS.map((o) => (
          <li
            key={o}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
          >
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}
