import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steve Jobs | Portfolio",
  description: "Portfolio of Steve Jobs - Entrepreneur, Visionary, and Co-founder of Apple Inc.",
  keywords: ["Steve Jobs", "Apple", "Design", "Innovation", "Portfolio", "Technology"],
  authors: [{ name: "Steve Jobs Portfolio" }],
  creator: "Steve Jobs Portfolio",
  icons: {
    icon: "/apple.webp",
    apple: "/apple.webp",
  },
  openGraph: {
    title: "Steve Jobs | Portfolio",
    description: "Portfolio of Steve Jobs - Entrepreneur, Visionary, and Co-founder of Apple Inc.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
