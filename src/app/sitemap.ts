import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rublix-wallet.com/ru",
      lastModified: new Date("2026-09-01T00:00:00+03:00"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
