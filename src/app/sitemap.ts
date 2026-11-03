import type { MetadataRoute } from "next";

const BASE_URL = "https://segma-safe.com";
const LAST_MODIFIED = new Date("2026-11-03T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
