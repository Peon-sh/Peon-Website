import { publicEnv } from '@/lib/env';
import { getMarketingBootScript } from '@/lib/marketing-boot-script';

/**
 * Inline (non-React) first-touch attribution + deferred GTM. Not a client
 * component — do not add `'use client'`.
 */
export function MarketingBoot() {
  return (
    <script
      id="peon-marketing-boot"
      dangerouslySetInnerHTML={{ __html: getMarketingBootScript(publicEnv.gtmId) }}
    />
  );
}
