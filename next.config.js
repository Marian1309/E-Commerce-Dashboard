/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
      'i.ibb.co'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  productionBrowserSourceMaps: false
};

module.exports = nextConfig;
