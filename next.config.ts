import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  // Keep canonical/robots/description in <head> for all UAs (Ahrefs, Chrome, etc.).
  htmlLimitedBots: /.*/,
};

export default nextConfig;
