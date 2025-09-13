/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f4f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Custom chunk naming
  //   if (!dev && !isServer) {
  //     config.output.chunkFilename = 'static/chunks/[name].[contenthash].js';
  //     // Or for fun: 'static/chunks/harrison-[name].[contenthash:8].js'
  //   }
  //   return config;
  // },
};

module.exports = nextConfig;
