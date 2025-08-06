/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
    config.externals['@solana/web3.js'] = 'commonjs @solana/web3.js';
    config.externals['@solana/spl-token'] = 'commonjs @solana/spl-token';
    return config;
  }
};

export default nextConfig;
