import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "SportOn",
    template: "%s | SportOn",
  },
  description: "SportOn – Modern Sports Commerce Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

import { ServiceWorkerUnregister } from "@/components/ServiceWorkerUnregister";
import { Providers } from "@/components/Providers";

/**
 * Root Layout - Minimal global providers
 * 
 * Route-specific providers:
 * - Shop pages (/, /product, /checkout, etc.) → ShopProviders in (shop)/layout.tsx
 * - Admin pages (/dashboard/*) → AdminProviders in (dashboard)/layout.tsx
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased font-poppins`}
        suppressHydrationWarning
      >
        <ServiceWorkerUnregister />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
