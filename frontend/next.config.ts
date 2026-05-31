import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.156"],
  images: {
    remotePatterns: [
      { hostname: "bucket-files.city-sightseeing.com" },
      { hostname: "images.squarespace-cdn.com" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "wanderwithsasha.com" },
      { hostname: "www.royalcaribbean.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "encrypted-tbn0.gstatic.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "i.imgur.com" },
      { hostname: "dynamic-media-cdn.tripadvisor.com" },
      { hostname: "media.timeout.com" },
      { hostname: "espreitaromundo.com" },
      { hostname: "imagens.publico.pt" },
      { hostname: "imagens.publico.pt" },
      { hostname: "imgmd.net" },
      { hostname: "cdn.bubblyliving.com" },
      { hostname: "apicciano.commons.gc.cuny.edu" },
      { hostname: "farm7.static.flickr.com" },
      { hostname: "tournavigator.pro" },
      { hostname: "aws-tiqets-cdn.imgix.net" },
      { hostname: "mylisbon.ru" },
      { hostname: "guidelissabon.com" },
      { hostname: "7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net" },
      { hostname: "cdn-imgix.headout.com" },
      { hostname: "portugal-traveling.ru" },
      { hostname: "downloader.disk.yandex.ru" },
      { hostname: "withportugal.com" },
    ],
  },
};

export default nextConfig;
