const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return "http://localhost:3000"; // Local fallback; set NEXT_PUBLIC_SITE_URL before deployment.
};

export const siteConfig = {
  name: "Utkarsh Saxena",
  description: "Golang, cloud-native development and distributed systems. Product Manager & Software Engineer at Piovation GMBH.",
  url: getSiteUrl(),

  // Personal Information
  author: {
    name: "Utkarsh Saxena",
    email: "utkarshsaxena2012@gmail.com",
    
    github: "UtkarshSaxenautk",
    linkedin: "utkarsh-saxena-5a9034201",
  },

  // Leave empty objects or comment out sections you don't want to use
  analytics: {
    visitors: {
      token: process.env.NEXT_PUBLIC_VISITORS_TOKEN,
    },
    // Umami Analytics
    umami: {
      websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
      url: process.env.NEXT_PUBLIC_UMAMI_URL,
    },
    // Microsoft Clarity
    clarity: {
      projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
