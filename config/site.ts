const getSiteUrl = () => {
  // Keep production and preview-build social links on the portfolio's public domain.
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const detected = process.env.VERCEL_PROJECT_PRODUCTION_URL
    || process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    || process.env.VERCEL_URL
    || process.env.NEXT_PUBLIC_VERCEL_URL;
  const value = configured
    || (process.env.NODE_ENV === "production" ? "https://utkarshsaxena.dev" : detected)
    || "http://localhost:3000";
  const url = new URL(value.includes("://") ? value : `https://${value}`);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP or HTTPS origin.");
  }
  return url.origin;
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
