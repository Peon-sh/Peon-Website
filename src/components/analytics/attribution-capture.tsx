'use client';

import { useEffect } from 'react';
import { captureFirstTouchAttribution } from '@/lib/attribution';

/** Capture first-touch campaign params into the peon_attr cookie on mount. */
export function AttributionCapture() {
  useEffect(() => {
    captureFirstTouchAttribution();
  }, []);
  return null;
}
