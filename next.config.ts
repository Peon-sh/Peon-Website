import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  // Keep canonical/robots/description in <head> for all UAs (Ahrefs, Chrome, etc.).
  htmlLimitedBots: /.*/,
  async redirects() {
    return [
      {
        source: "/self-host-wordpress-docker-vps",
        destination: "/blogs/self-host-wordpress-docker-vps",
        permanent: true,
      },
      {
        source: "/deploy-next-js-on-peon-with-git-ci-cd-and-nixpacks",
        destination: "/blogs/deploy-next-js-on-peon-with-git-ci-cd-and-nixpacks",
        permanent: true,
      },
      {
        source: "/tempo-vs-framer-website-deployment-seo-comparison",
        destination: "/blogs/tempo-vs-framer-website-deployment-seo-comparison",
        permanent: true,
      },
      {
        source: "/blogs/create-digitalocean-droplet-connect-peon",
        destination: "/blogs/create-a-digitalocean-droplet-and-connect-it-to-peon",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
