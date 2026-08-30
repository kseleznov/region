import type { NextConfig } from "next";

// Self-hosted place/city photos are served by the backend under /static.
// Deriving the pattern from NEXT_PUBLIC_API_URL means dev (localhost:3001)
// and the deployed API host both work without touching this file.
const apiUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
);

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.156"],
  images: {
    // Next 16 blocks the image optimizer from fetching upstream images that
    // resolve to a private/loopback IP (SSRF guard). In dev the API is on
    // localhost, so allow it there; in production the API is a public host
    // and this stays off.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: apiUrl.hostname,
        port: apiUrl.port || undefined,
        pathname: "/static/**",
      },
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
      { hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
