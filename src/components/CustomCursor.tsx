"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100); // Initialize off-screen
  const cursorY = useMotionValue(-100); // Initialize off-screen

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8); // Adjust for half cursor size (16px / 2)
      cursorY.set(e.clientY - 8); // Adjust for half cursor size (16px / 2)
    };

    window.addEventListener("mousemove", moveCursor);

    // Handle link hover effects
    const handleMouseEnter = () => setIsHoveringLink(true);
    const handleMouseLeave = () => setIsHoveringLink(false);

    document.querySelectorAll("a, button, input[type=\'submit\'], .group").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button, input[type=\'submit\'], .group").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={
        `fixed z-[9999] rounded-full pointer-events-none transition-all duration-100 ease-out
        ${isHoveringLink ? 'bg-primary/70 h-10 w-10 border-none' : 'bg-accent h-4 w-4 border border-primary'}`
      }
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}
