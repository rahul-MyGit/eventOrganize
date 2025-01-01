/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/custom-component"],

};

export default nextConfig;
