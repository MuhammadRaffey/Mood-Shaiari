import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const notoNastaliq = localFont({
  src: [
    {
      path: "./fonts/NotoNastaliqUrdu-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NotoNastaliqUrdu-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/NotoNastaliqUrdu-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/NotoNastaliqUrdu-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-noto-nastaliq",
});

export const metadata: Metadata = {
  title: "موڈ شاعری | Mood Shayari",
  description: "Transform your emotions into beautiful Urdu poetry with AI",
  keywords: ["shayari", "urdu poetry", "mood", "AI poetry", "ghazal", "nazm"],
  authors: [{ name: "Mood Shayari" }],
  openGraph: {
    title: "موڈ شاعری | Mood Shayari",
    description: "Transform your emotions into beautiful Urdu poetry with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoNastaliq.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
