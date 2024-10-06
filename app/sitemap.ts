import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://chronology-of-a-judgment.hobbesfree.io',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
  ]
}