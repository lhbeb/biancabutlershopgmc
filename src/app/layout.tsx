import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import SameDayShipping from "@/components/SameDayShipping";
import NewsletterSection from "@/components/NewsletterSection";
import InstagramSection from "@/components/InstagramSection";
import ErrorBoundaryWrapper from "@/components/ErrorBoundary";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";
import { Suspense } from "react";
import VisitNotifier from "@/components/VisitNotifier";
import FacebookPixel from "@/components/FacebookPixel";
import { AdminRouteCheck, PublicRouteOnly, AdminRouteOnly, CheckoutRouteOnly } from "@/components/AdminRouteCheck";
import GlobalErrorReporter from "@/components/GlobalErrorReporter";
import LiveChatWidget from "@/components/LiveChatWidget";
import FixedSocialRail from "@/components/FixedSocialRail";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bianca Butler | Curated Antiques & Decorative Finds",
  description: "Discover figurines, decorative objects, vintage accents, and collectible finds curated by Bianca Butler.",
  keywords: "Bianca Butler, antiques, figurines, home decor, vintage decor, collectibles, decorative objects",
  authors: [{ name: "Bianca Butler" }],
  creator: "Bianca Butler",
  publisher: "Bianca Butler",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://biancabutler.shop"),
  openGraph: {
    title: "Bianca Butler | Curated Antiques & Decorative Finds",
    description: "Shop figurines, decorative objects, vintage accents, and collectible finds from Bianca Butler.",
    url: "https://biancabutler.shop",
    siteName: "Bianca Butler",
    images: [
      {
        url: "/g7x.jpeg",
        width: 1200,
        height: 630,
        alt: "Bianca Butler antiques and decorative finds",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bianca Butler | Curated Antiques & Decorative Finds",
    description: "Shop figurines, decorative objects, vintage accents, and collectible finds from Bianca Butler.",
    images: ["/g7x.jpeg"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" href="/logosvg.svg" as="image" type="image/svg+xml" />
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="k3ytyf6hqaa462mz10uzwnmugj0d0o" />
        <meta name="msvalidate.01" content="75494FC1101908256EEEA046C47C3264" />
        {/* Google Merchant Center Domain Claim Verification */}
        <meta name="google-site-verification" content="o8gC6haURQ1t7L9G8xfh_-5imCYNPmnhjnt2IrgEPco" />
        <meta name="google-site-verification" content="whWwvqC20XmxK8qOhFgMP6wWGrqw2QYp-W-OSxNmlW8" />
        {/* Contentsquare Session Recording */}
        <Script 
          async 
          src="https://t.contentsquare.net/uxa/6b28195ddd3fc.js"
          strategy="afterInteractive"
        />
        {/* Meta Pixel base snippet + init.
            Loaded synchronously in <head> (NOT afterInteractive) so `window.fbq` exists
            before React hydrates. This removes the race that silently dropped PageView,
            AddToCart, ViewContent and InitiateCheckout events. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','869199797850063');fbq('track','PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=869199797850063&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body suppressHydrationWarning className={`${dmSans.variable} ${dmSerifText.variable} font-sans antialiased text-[#261810]`}>
        <GlobalErrorReporter />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <PublicRouteOnly>
          <VisitNotifier />
        </PublicRouteOnly>
        {/* Organization Schema */}
        <AdminRouteCheck>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Bianca Butler",
                "url": "https://biancabutler.shop",
                "logo": "https://biancabutler.shop/logosvg.svg",
                "description": "Bianca Butler is an antiques shop offering figurines, decorative objects, vintage accents, and collectible finds.",
                "sameAs": [
                  "https://www.instagram.com/biancabutler.shop",
                  "https://www.pinterest.com/biancabutlershop",
                  "https://www.tiktok.com/@biancabutler.shop",
                  "https://x.com/heybiancashop"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "contact@biancabutler.shop",
                  "telephone": "+1-562-451-5530",
                  "areaServed": ["US"]
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "301 Roundhill Dr",
                  "addressLocality": "Rockaway",
                  "addressRegion": "NJ",
                  "postalCode": "07866",
                  "addressCountry": "US"
                }
              })
            }}
          />
        </AdminRouteCheck>

        {/* WebSite Schema */}
        <AdminRouteCheck>
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Bianca Butler",
                "url": "https://biancabutler.shop",
                "description": "Bianca Butler is an antiques shop offering figurines, decorative objects, vintage accents, and collectible finds.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://biancabutler.shop/api/products/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        </AdminRouteCheck>

        <ErrorBoundaryWrapper>
          {/* Public website with header, footer, etc. */}
          <PublicRouteOnly>
            <div className="min-h-screen flex flex-col">
              <Suspense fallback={null}>
                <ClientHeader />
              </Suspense>
              <main className="flex-grow">
                {children}
              </main>
              <Suspense fallback={null}>
                <InstagramSection />
              </Suspense>
              <NewsletterSection />
              <div className="h-4 bg-white md:h-6" aria-hidden="true" />
              <SameDayShipping />
              <Footer />
            </div>
            <CookieConsent />
          </PublicRouteOnly>

          {/* Checkout page - navbar only, no distractions */}
          <CheckoutRouteOnly>
            <div className="min-h-screen flex flex-col">
              <Suspense fallback={null}>
                <ClientHeader />
              </Suspense>
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </CheckoutRouteOnly>

          {/* Admin dashboard - clean, no public UI */}
          <AdminRouteOnly>
            {children}
          </AdminRouteOnly>
        </ErrorBoundaryWrapper>

        {/* The external analytics tracker currently returns HTTP 500 from
            analyticsapp-five.vercel.app/api/track. Keep it opt-in until that
            service is healthy; this prevents noisy client errors in production. */}
        {process.env.NEXT_PUBLIC_ANALYTICS_TRACKER_ENABLED === "true" && (
          <AdminRouteCheck>
            <Script
              src="https://analyticsapp-five.vercel.app/tracker.js"
              strategy="afterInteractive"
              async
            />
          </AdminRouteCheck>
        )}
        <FixedSocialRail />
        <LiveChatWidget />
        <SpeedInsights />
      </body>
    </html>
  );
}
