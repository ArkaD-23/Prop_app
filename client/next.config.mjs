/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source:"/server/:path*",
        destination:"http://localhost:3000/server/:path*",
      }
    ]
  }
};
  
  export default nextConfig;
  