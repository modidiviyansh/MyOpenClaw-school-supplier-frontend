"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn utility is available or created

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

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
        className={cn(
          "fixed top-4 left-0 right-0 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-3xl items-center justify-between rounded-full border border-transparent bg-white/70 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-lg transition-all duration-300",
          isScrolled && "border-gray-200 bg-white/90 shadow-md"
        )}
      >
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-foreground">
          THE UPLIFT CO.
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/products" className="text-sm font-body font-medium text-gray-600 transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-body font-medium text-gray-600 transition-colors hover:text-foreground">
            Our Story
          </Link>
          <Link href="/contact" className="text-sm font-body font-medium text-gray-600 transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-full bg-black p-2 text-white shadow-md transition-transform hover:bg-primary"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">0</span>
          </motion.button>
          <button
            className="md:hidden rounded-full p-2 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl md:hidden"
        >
          <button
            className="absolute top-6 right-6 rounded-full p-2 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6 text-foreground" />
          </button>
          <div className="flex flex-col gap-8 text-center text-3xl font-display font-bold text-foreground">
            <Link href="/products" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>Our Story</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
