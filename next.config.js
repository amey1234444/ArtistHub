/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  // Remove the experimental.serverActions configuration as it's now enabled by default
}

module.exports = nextConfig