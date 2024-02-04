/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.PROJECT_ID}.supabase.co`],
  },
};

export default nextConfig;
