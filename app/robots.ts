import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: "/private/",
      },
    ],
    sitemap: "https://chronology-of-a-judgment.hobbesfree.io/sitemap.xml",
  }
}
