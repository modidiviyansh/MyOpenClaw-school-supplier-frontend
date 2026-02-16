/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "127.0.0.1", "strapi.coolify.theupliftco.com"], // Allow images from Strapi domain
  },
};

export default nextConfig;
