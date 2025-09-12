/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
    // formats: ['image/avif', 'image/webp'],
    // deviceSizes: [640, 750, 828, 1080, 1200],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom chunk naming
    if (!dev && !isServer) {
      config.output.chunkFilename = 'static/chunks/[name].[contenthash].js';
      // Or for fun: 'static/chunks/harrison-[name].[contenthash:8].js'
    }
    return config;
  },
};

module.exports = nextConfig;
