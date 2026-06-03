import type { Metadata } from "next";
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
  title: "FinPilot Knowledge Bot",
  description: "A scaffolded company knowledge assistant for FinPilot Analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[radial-gradient(circle_at_top_left,_#f7f3e8,_transparent_34%),linear-gradient(135deg,_#f8fafc_0%,_#edf7f3_48%,_#e2e8f0_100%)] text-slate-950">
        {children}
      </body>
    </html>
  );
}
