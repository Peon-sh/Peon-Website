import Image from 'next/image';

const RASTER = /\.(png|jpe?g|webp|gif|avif)$/i;

/** SVGs too large to load at 36×36 (next/image does not resize SVG). */
const HEAVY_SVG = new Set([
  '/svgs/chibisafe.svg',
  '/svgs/cloudreve.svg',
  '/svgs/gowa.svg',
  '/svgs/openarchiver.svg',
  '/svgs/owncloud.svg',
  '/svgs/seaweedfs.svg',
  '/svgs/sparkyfitness.svg',
  '/svgs/swetrix.svg',
  '/svgs/terraria.svg',
  '/svgs/wikijs.svg',
]);

function LetterFallback({ name }: { name: string }) {
  return (
    <div className="bg-secondary text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold">
      {name.charAt(0)}
    </div>
  );
}

/**
 * 36×36 marketplace card mark. Rasters go through next/image; heavy SVGs use
 * the letter tile so they cannot become LCP.
 */
export function MarketplaceLogo({
  src,
  name,
  priority = false,
}: {
  src?: string;
  name: string;
  priority?: boolean;
}) {
  if (!src || HEAVY_SVG.has(src)) {
    return <LetterFallback name={name} />;
  }

  const className = 'size-9 shrink-0 rounded-md bg-white object-contain p-1';

  if (RASTER.test(src)) {
    return (
      <Image
        src={src}
        alt=""
        width={36}
        height={36}
        className={className}
        sizes="36px"
        preload={priority}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- local SVG; next/image does not compress SVG
    <img
      src={src}
      alt=""
      width={36}
      height={36}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
