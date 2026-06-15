import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization
  output: 'standalone',

  // Aggressive caching headers
  async headers() {
    return [
      // Cache static assets for 1 year
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache public images for 7 days
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache SVGs and other public assets for 7 days
      {
        source: '/:path*.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache HTML pages for 1 hour with SWR
      {
        source: '/((?!api).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Proxy sunliv conversion flow landing page
  async rewrites() {
    return [
      {
        source: '/sunliv-moda-praia-atacado-2026',
        destination: 'https://sunliv-conversion-flow.vercel.app/',
      },
      {
        source: '/sunliv-moda-praia-atacado-2026/:path*',
        destination: 'https://sunliv-conversion-flow.vercel.app/:path*',
      },
    ];
  },

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24h cache for optimized images
  },
};

export default nextConfig;
