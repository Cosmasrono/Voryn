import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voryncapital.co.ke"),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "business loans",
    "working capital loan",
    "asset financing motorcycles",
    "boda boda loans",
    "chama group loans",
    "SME loans",
    "M-Pesa loans",
    "micro finance",
    "Voryn Capital",
    "Mama Biashara loan",
    "agri loan",
  ],
  openGraph: {
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
        <CookieConsent />
      </body>
    </html>
  );
}
