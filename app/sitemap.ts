import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abraj-sweets.com";
  const locales = ["ar", "en"];

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/products/eastern", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/products/western", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/products/bakery", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/products/tortes", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/offers", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/branches", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}
