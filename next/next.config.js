/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["github.com"], // 이미지를 호스팅하는 도메인을 여기에 추가
  },
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
