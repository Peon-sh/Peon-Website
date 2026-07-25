import { Pool, type QueryResultRow } from 'pg';

declare global {
  var peonAnalyticsPool: Pool | undefined;
}

/**
 * Read-only pool against peon-analytics (DATABASE_URL).
 * Website never writes. Only SELECT published blog content.
 */
export function getAnalyticsPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL must be set (peon-analytics read-only)');
  }

  if (!globalThis.peonAnalyticsPool) {
    globalThis.peonAnalyticsPool = new Pool({
      connectionString,
      max: 5,
      // Fail fast if misconfigured; do not hang SSR forever.
      connectionTimeoutMillis: 5_000,
    });
  }

  return globalThis.peonAnalyticsPool;
}

export async function analyticsQuery<T extends QueryResultRow>(
  text: string,
  values?: unknown[],
): Promise<T[]> {
  const pool = getAnalyticsPool();
  const result = await pool.query<T>(text, values);
  return result.rows;
}
