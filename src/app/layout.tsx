import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import ClientProviders from "@/components/ClientProviders";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Uplift Co. - Elevate Education",
  description: "Premium school supplies for the next generation of thinkers, creators, and leaders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground font-body antialiased`}>
        <ClientProviders>
          <div className="relative min-h-screen">
            <GrainOverlay />
            <CustomCursor />
            <Navbar />
            <main className="relative z-20">{children}</main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
