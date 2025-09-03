// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⚠️ Warning: This will allow production builds to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
