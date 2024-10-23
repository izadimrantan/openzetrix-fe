import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AppContext from "@/components/app";

// Fonts configuration
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenZetrix - Zetrix Smart Contract, simplified",
  description: "Write reliable, trusted, standardized smart contracts on Zetrix, with a click of a button.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AppContext>{children}</AppContext>
      </body>
    </html>
  );
}
