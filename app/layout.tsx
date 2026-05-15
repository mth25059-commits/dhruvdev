import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { CustomCursor } from "@/components/cursor";
import { GridBackground } from "@/components/grid-background";
import { CodeRainBackground } from "@/components/code-globe";
import { Navbar } from "@/components/navbar";
import { AiChat } from "@/components/ai-chat";
import { SITE } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  // Light is the default theme; mobile browser chrome should match.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0F" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Web · Bots · AI Automation`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Dhruv Chandrawanshi",
    "AI developer India",
    "Telegram bot developer",
    "AI automation",
    "Next.js portfolio",
    "VPS hosting",
    "n8n automation",
    "AI website builder",
    "Cursor developer",
    "Indie hacker India",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Independent AI Developer",
  description: SITE.description,
  sameAs: [SITE.linkedin].filter(Boolean),
  knowsAbout: [
    "Web Development",
    "Telegram Bots",
    "AI Automation",
    "VPS Hosting",
    "Next.js",
    "Tailwind CSS",
  ],
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* No-flash theme bootstrap. Light is the default; only flip to dark
            if the user explicitly chose it in a previous visit. Runs before
            paint so there's no light-to-dark flash for dark-mode users. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('dhruvdev-theme');if(t!=='dark'){document.documentElement.classList.add('light')}}catch(e){document.documentElement.classList.add('light')}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[rgb(var(--bg-base))] text-[rgb(var(--text-primary))]">
        <ThemeProvider>
          <LenisProvider>
            <GridBackground />
            <CodeRainBackground />
            <CustomCursor />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <AiChat />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
