import type { Metadata } from "next";
import { Inclusive_Sans } from "next/font/google";
import "@/styles/globals.css";

const inclusiveSans = Inclusive_Sans({
  variable: "--font-incl-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R3F Starter",
  description: "An opinionated Next.js starter app for React 3 Fiber projects",
  keywords: [
    "React",
    "React Three Fiber",
    "Three.js",
    "3D",
    "Next.js",
    "Starter",
  ],
  authors: [
    { name: "Briana Gude", url: "https://www.brianagude.com" }
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inclusiveSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
