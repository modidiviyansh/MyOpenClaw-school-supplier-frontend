"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ShoppingBag, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 mx-auto flex w-full max-w-none items-center justify-between bg-background/90 px-6 py-3 border-b border-gray-100 dark:border-gray-800 dark:bg-gray-950/90", // Brutally minimal, no blur, no shadows
          isOpen && "!hidden"
        )}
      >
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-foreground"> {/* Simplified Logo */}
          THE UPLIFT CO.
        </Link>

        <div className="hidden items-center gap-8 md:flex"> {/* Reduced gap */}
          <Link href="/products" className="text-sm font-body font-medium text-foreground transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-body font-medium text-foreground transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            Our Story
          </Link>
          <Link href="/contact" className="text-sm font-body font-medium text-foreground transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4"> {/* Reduced gap */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-gray-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>
          )}
          <button
            className="relative rounded-full bg-primary p-2 text-white shadow-sm transition-transform hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white leading-none">0</span>
          </button>
          <button
            className="md:hidden rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 md:hidden dark:bg-gray-950/95"
        >
          <button
            className="absolute top-6 right-6 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6 text-foreground" />
          </button>
          <div className="flex flex-col gap-6 text-center text-2xl font-display font-bold text-foreground">
            <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Our Story</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
