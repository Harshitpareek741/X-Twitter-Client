/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    domains: ['images.macrumors.com','lh3.googleusercontent.com','pbs.twimg.com',
      "twitter-devv.s3.ap-south-1.amazonaws.com"
    ]
  }
};

export default nextConfig;
