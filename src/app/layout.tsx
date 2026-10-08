import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL } from "@/lib/config";
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: "Arial",
});
const grotesk = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-grotesk",
  adjustFontFallback: "Arial",
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Campus2Pro | Skill Development & Placement Preparation for College Students",
  description:
    "Campus2Pro helps college students build industry-ready skills, real-world projects, resumes and interview skills to become placement-ready.",
  keywords: [
    "Campus2Pro",
    "skill development for college students",
    "placement preparation",
    "coding classes for college students",
    "full stack development training",
    "career development",
    "internship preparation",
    "job preparation for students",
    "technical interview preparation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Campus2Pro",
    title: "Campus2Pro — From Campus to Career.",
    description:
      "Learn the right skills. Build real projects. Become placement-ready.",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Campus2Pro — From Campus to Career.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus2Pro — From Campus to Career.",
    description: "Build skills. Build projects. Get career-ready.",
    images: ["/images/og-cover.png"],
  },
  icons: { icon: "/icon.svg", apple: "/icons/apple-touch-icon.png" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10234b",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${grotesk.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
