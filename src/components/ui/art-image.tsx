import { cn } from '@/lib/utils';

/**
 * Generated editorial-print illustration from public/art/sections (see
 * scripts/generate-brand-art.ts). All images are 1536×1024, so the aspect ratio is
 * fixed and the layout never shifts while they load.
 */
export function ArtImage({
  name,
  alt,
  className,
  priority = false,
}: {
  /** File stem under public/art/sections, e.g. "git-push". */
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static, pre-sized art
    <img
      src={`/art/sections/${name}.webp`}
      alt={alt}
      width={1536}
      height={1024}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('aspect-[3/2] w-full rounded-sm object-cover', className)}
    />
  );
}
