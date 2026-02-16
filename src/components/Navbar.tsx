"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 mx-auto flex w-full max-w-2xl items-center justify-between rounded-full border border-black/5 bg-white/80 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-md"
      >
        <Link href="/" className="text-lg font-black tracking-tighter">
          THE UPLIFT CO.
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/products" className="text-sm font-medium text-gray-600 transition-colors hover:text-black">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 transition-colors hover:text-black">
            Our Story
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 transition-colors hover:text-black">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full bg-black p-2 text-white transition-transform hover:scale-105">
            <ShoppingBag className="h-4 w-4" />
          </button>
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-8 text-center text-2xl font-bold">
            <Link href="/products" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>Our Story</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
