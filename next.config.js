/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: 'www.onealphaai.com' },
      { protocol: 'https', hostname: 'unpkg.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  redirects: async () => {
    return [
      { source: '/dashboard', destination: '/terminal', permanent: false },
    ];
  },
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://onealphaai.com',
  },
};

module.exports = nextConfig;
