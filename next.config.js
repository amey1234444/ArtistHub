/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  experimental: {
    appDir: true
  },
  // Add this if you're using the Pages Router
  pages: {
    excludeDefaultMomentLocales: true
  },
  // Ensure images from any domain can be used
  images: {
    domains: ['*']
  }
};

module.exports = nextConfig;