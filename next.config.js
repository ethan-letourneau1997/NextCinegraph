const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  images: {
    domains: ['image.tmdb.org'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
