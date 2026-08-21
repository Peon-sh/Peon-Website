const PRODUCT_HUNT_BADGE =
  'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1206439&theme=light&t=1785051322486';

const REVALIDATE_SEC = 14400;

/** Live Product Hunt badge, fetched server-side so the browser stays first-party. */
export async function GET() {
  try {
    const upstream = await fetch(PRODUCT_HUNT_BADGE, {
      next: { revalidate: REVALIDATE_SEC },
      headers: { Accept: 'image/svg+xml' },
    });
    if (!upstream.ok) {
      return new Response('Product Hunt badge unavailable', { status: 502 });
    }

    const svg = await upstream.text();
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': `public, max-age=${REVALIDATE_SEC}`,
      },
    });
  } catch {
    return new Response('Product Hunt badge unavailable', { status: 502 });
  }
}
