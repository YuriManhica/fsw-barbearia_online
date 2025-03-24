/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "dbmib2q8rj.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
