/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: "http://backend:5000/server/:path*",
      },
    ];
  },
};

export default nextConfig;
