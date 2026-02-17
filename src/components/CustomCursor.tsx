"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type CursorVariant = "default" | "text" | "link";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      backgroundColor: "rgba(139, 92, 246, 0.4)", // primary/40
      width: 16,
      height: 16,
      mixBlendMode: "normal",
    },
    text: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      backgroundColor: "rgba(139, 92, 246, 0.6)", // primary/60
      width: 48,
      height: 48,
      mixBlendMode: "difference",
    },
    link: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "rgba(59, 130, 246, 0.6)", // blue/60
      width: 32,
      height: 32,
      mixBlendMode: "difference",
    },
  };

  const spring = {
    stiffness: 500,
    damping: 28,
  };

  useEffect(() => {
    const handleMouseEnter = (variant: CursorVariant) => () => setCursorVariant(variant);
    const handleMouseLeave = () => setCursorVariant("default");

    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span.text-cursor").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter("text") as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    document.querySelectorAll("a, button, .group").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter("link") as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span.text-cursor").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter("text") as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      document.querySelectorAll("a, button, .group").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter("link") as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        animate={cursorVariant}
        transition={spring}
        className={cn(
          "pointer-events-none fixed z-[9999] hidden rounded-full opacity-0 lg:block",
          "bg-primary/40 dark:bg-primary/40", // Base color for default
          "blur-sm filter will-change-transform transform-gpu"
        )}
      />
    </AnimatePresence>
  );
}
