/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/server/:path*", 
        destination: "http://localhost:5000/server/:path*", 
      },
    ];
  },
};

export default nextConfig;

//"https://propapp-backend.onrender.com/server/:path*",

