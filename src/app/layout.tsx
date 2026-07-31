import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Campus Marketplace — Buy & Sell Books, Electronics & Lab Gear",
  description: "A dedicated campus web application for BCA students to buy and sell used textbooks, scientific calculators, microprocessors, and lab equipment on campus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#0b0f19] text-white`}>
        {children}
      </body>
    </html>
  );
}
