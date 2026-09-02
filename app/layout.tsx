import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "ALSTERCODE – Kleinunternehmer-Vorlagen",
    template: "%s · ALSTERCODE",
  },
  description:
    "Rechnung und Zahlungserinnerung für Kleinunternehmer gemäß § 19 UStG. Word- und PDF-Muster, 12 €, Zahlung über PayPal.",
  robots: { index: true, follow: true },
  authors: [{ name: site.owner, url: `mailto:${site.email}` }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
