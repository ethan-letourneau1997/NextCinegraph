const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withVideos = require('next-videos');
module.exports = withVideos();

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  images: {
    domains: ['image.tmdb.org'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
