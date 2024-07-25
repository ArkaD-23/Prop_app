/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: "https://propapp-backend.onrender.com/server/:path*",
      },
    ];
  },
};

export default nextConfig;
