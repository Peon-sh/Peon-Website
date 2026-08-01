/**
 * First-touch marketing attribution for peon.sh → app.peon.sh.
 *
 * Captures campaign query params into a first-party cookie (Domain=.peon.sh when
 * on peon.sh) so browsing the marketing site and crossing to the app does not
 * drop the funnel source. Cookie is write-once (first-touch).
 */

export const ATTRIBUTION_COOKIE = 'peon_attr';
export const ATTRIBUTION_MAX_AGE_SEC = 90 * 24 * 60 * 60;
export const ATTRIBUTION_VALUE_MAX = 200;

/** Query keys we persist and forward. */
export const ATTRIBUTION_QUERY_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'ref',
  'gclid',
  'fbclid',
  'msclkid',
  'campaign',
] as const;

export type AttributionQueryKey = (typeof ATTRIBUTION_QUERY_KEYS)[number];

export type AttributionPayload = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  ref?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  campaign?: string;
  landing_path?: string;
  captured_at?: string;
};

const KEY_SET = new Set<string>(ATTRIBUTION_QUERY_KEYS);

function sanitizeValue(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.length > ATTRIBUTION_VALUE_MAX) return trimmed.slice(0, ATTRIBUTION_VALUE_MAX);
  return trimmed;
}

/** Parse attribution fields from a URLSearchParams / query string. */
export function parseAttributionParams(
  search: string | URLSearchParams,
): AttributionPayload | null {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;
  const out: AttributionPayload = {};
  let found = false;
  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = params.get(key);
    if (value == null) continue;
    const clean = sanitizeValue(value);
    if (!clean) continue;
    out[key] = clean;
    found = true;
  }
  return found ? out : null;
}

export function hasAttributionFields(payload: AttributionPayload | null | undefined): boolean {
  if (!payload) return false;
  return ATTRIBUTION_QUERY_KEYS.some((k) => Boolean(payload[k]));
}

/** Cookie Domain for shared peon.sh / app.peon.sh; omit on localhost. */
export function attributionCookieDomain(hostname: string): string | undefined {
  const host = hostname.toLowerCase();
  if (host === 'peon.sh' || host.endsWith('.peon.sh')) return '.peon.sh';
  return undefined;
}

export function readAttributionCookie(): AttributionPayload | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ATTRIBUTION_COOKIE}=`));
  if (!match) return null;
  const raw = match.slice(ATTRIBUTION_COOKIE.length + 1);
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as AttributionPayload;
    if (!parsed || typeof parsed !== 'object') return null;
    return sanitizePayload(parsed);
  } catch {
    return null;
  }
}

function sanitizePayload(input: AttributionPayload): AttributionPayload | null {
  const out: AttributionPayload = {};
  let found = false;
  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = input[key];
    if (typeof value !== 'string') continue;
    const clean = sanitizeValue(value);
    if (!clean) continue;
    out[key] = clean;
    found = true;
  }
  if (typeof input.landing_path === 'string' && input.landing_path) {
    out.landing_path = sanitizeValue(input.landing_path) ?? undefined;
  }
  if (typeof input.captured_at === 'string' && input.captured_at) {
    out.captured_at = input.captured_at.slice(0, 40);
  }
  return found ? out : null;
}

/**
 * Write first-touch cookie. No-op if a cookie already exists or payload is empty.
 * Returns true when a new cookie was written.
 */
export function captureFirstTouchAttribution(opts?: {
  search?: string | URLSearchParams;
  pathname?: string;
}): boolean {
  if (typeof document === 'undefined' || typeof window === 'undefined') return false;
  if (readAttributionCookie()) return false;

  const fromQuery = parseAttributionParams(opts?.search ?? window.location.search);
  if (!fromQuery) return false;

  const payload: AttributionPayload = {
    ...fromQuery,
    landing_path: sanitizeValue(opts?.pathname ?? window.location.pathname) ?? '/',
    captured_at: new Date().toISOString(),
  };

  const encoded = encodeURIComponent(JSON.stringify(payload));
  const domain = attributionCookieDomain(window.location.hostname);
  const parts = [
    `${ATTRIBUTION_COOKIE}=${encoded}`,
    'Path=/',
    `Max-Age=${ATTRIBUTION_MAX_AGE_SEC}`,
    'SameSite=Lax',
  ];
  if (window.location.protocol === 'https:') parts.push('Secure');
  if (domain) parts.push(`Domain=${domain}`);
  document.cookie = parts.join('; ');
  return true;
}

/** Merge attribution into an absolute app URL (or path). Prefers cookie, then page search. */
export function withAttributionQuery(
  href: string,
  opts?: { search?: string | URLSearchParams },
): string {
  const fromCookie = readAttributionCookie();
  const fromPage = parseAttributionParams(opts?.search ?? (typeof window !== 'undefined' ? window.location.search : ''));
  const source = fromCookie ?? fromPage;
  if (!source || !hasAttributionFields(source)) return href;

  try {
    const url = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'https://app.peon.sh');
    for (const key of ATTRIBUTION_QUERY_KEYS) {
      const value = source[key];
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    }
    // Absolute href that was already absolute: keep origin+path+search.
    if (/^https?:\/\//i.test(href)) {
      return url.toString();
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}

/** Drop unknown keys from a loose object (for tests / debugging). */
export function pickAttributionKeys(input: Record<string, unknown>): AttributionPayload {
  const out: AttributionPayload = {};
  for (const [key, value] of Object.entries(input)) {
    if (!KEY_SET.has(key) || typeof value !== 'string') continue;
    const clean = sanitizeValue(value);
    if (clean) out[key as AttributionQueryKey] = clean;
  }
  return out;
}
