/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Disable static optimization - use dynamic rendering
  // This fixes "window is not defined" errors with Polkadot extensions
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    APILLON_API_KEY: process.env.APILLON_API_KEY,
    APILLON_IPFS_GATEWAY: process.env.APILLON_IPFS_GATEWAY,
  },
  webpack: (config, { isServer }) => {
    // Fix for node: protocol imports
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };

    // Exclude Apillon SDK from client-side bundle
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@apillon/sdk': false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
