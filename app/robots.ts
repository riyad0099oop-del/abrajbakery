import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/ar/admin", "/en/admin"],
      },
    ],
    sitemap: "https://abraj-sweets.com/sitemap.xml",
  };
}
