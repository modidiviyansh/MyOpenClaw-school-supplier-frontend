import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

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
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} TheUpliftCo. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
