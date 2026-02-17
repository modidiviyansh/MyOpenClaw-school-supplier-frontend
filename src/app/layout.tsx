import type { Metadata } from "next";
import "./../styles/globals.css";
import ClientProviders from "@/components/ClientProviders";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

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
      <body className={`bg-background text-foreground font-body antialiased`}>
        <ClientProviders>
          <div className="relative min-h-screen">
            <CustomCursor />
            <Navbar />
            <main className="relative z-20">{children}</main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
