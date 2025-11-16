/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Cloudflare Pages configuration
  // Use 'export' for static export, or remove for dynamic rendering
  // For Cloudflare Pages with Next.js, we'll use @cloudflare/next-on-pages
  output: process.env.CF_PAGES ? undefined : 'standalone',
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
