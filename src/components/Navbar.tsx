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
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-4 left-0 right-0 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-4xl items-center justify-between rounded-full border border-gray-200/50 bg-background/80 px-8 py-4 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-950/80", // Enhanced glassmorphism
          isScrolled && "border-primary/30 bg-background/95 shadow-2xl dark:border-primary/20 dark:bg-gray-950/95", // More prominent on scroll
          isOpen && "!hidden"
        )}
      >
        <Link href="/" className="font-display text-2xl font-black tracking-wide text-foreground"> {/* Enhanced Logo */}
          THE UPLIFT CO.
        </Link>

        <div className="hidden items-center gap-10 md:flex"> {/* Increased gap */}
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

        <div className="flex items-center gap-6"> {/* Increased gap */}
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.05, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-gray-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-full bg-primary p-2 text-white shadow-md transition-transform hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white leading-none">0</span>
          </motion.button>
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
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl md:hidden dark:bg-gray-950/95"
        >
          <button
            className="absolute top-6 right-6 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6 text-foreground" />
          </button>
          <div className="flex flex-col gap-8 text-center text-3xl font-display font-bold text-foreground">
            <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Our Story</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
