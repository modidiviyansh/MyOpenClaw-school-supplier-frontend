import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TheUpliftCo - Premium School Supplies",
  description: "One-stop shop for all your school needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <footer className="bg-gray-100 py-12 text-center">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-6 text-lg font-black tracking-tighter">
                THE UPLIFT CO.
              </div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} TheUpliftCo. All rights reserved.
              </p>
            </div>
          </footer>
        </ClientProviders>
      </body>
    </html>
  );
}
