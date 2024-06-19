/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.shopify.com", "res.cloudinary.com"],
    formats: ["image/webp"],
  },
  env: {
    MONGO_DB: process.env.MONGO_DB,
    PUBLIC_ACCESS_TOKEN: process.env.PUBLIC_ACCESS_TOKEN,
  },
};

export default nextConfig;
