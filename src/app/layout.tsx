import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sound Bite - Find the Perfect Sound for Your Next Project",
  description: "Discover and download high-quality sound effects and audio packs for your creative projects. Browse thousands of royalty-free sounds from professional creators.",
  keywords: ["sound effects", "audio packs", "royalty-free", "music production", "sound design"],
  authors: [{ name: "Sound Bite Team" }],
  openGraph: {
    title: "Sound Bite - Professional Sound Effects Platform",
    description: "Discover and download high-quality sound effects and audio packs for your creative projects.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sound Bite - Professional Sound Effects Platform",
    description: "Discover and download high-quality sound effects and audio packs for your creative projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
