import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const toOrigin = (url?: string | null) => {
      try {
        if (!url) return null
        return new URL(url).origin
      } catch {
        return null
      }
    }

    const bvUrl = process.env.BIBLE_VERSIONS_API_URL || null
    const bvSearchUrl = process.env.BIBLE_VERSIONS_SEARCH_URL || null
    const yvVerse = process.env.YV_VERSE_API_BASE_URL || 'https://bible.youversionapistaging.com/3.1'
    const yvAudio = process.env.YV_AUDIO_API_BASE_URL || 'https://audio-bible.youversionapistaging.com/3.1'

    const connectSrc: string[] = ["'self'"]
    ;[bvUrl, bvSearchUrl, yvVerse, yvAudio]
      .map(toOrigin)
      .filter((o): o is string => !!o)
      .forEach((origin) => {
        if (!connectSrc.includes(origin)) connectSrc.push(origin)
      })

    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      `connect-src ${connectSrc.join(' ')}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: csp },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "payment=()",
              "usb=()",
              "fullscreen=(self)",
            ].join(", "),
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web-assets.youversion.com",
      },
    ],
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
