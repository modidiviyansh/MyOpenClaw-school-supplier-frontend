"use client";

import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

export default function GrainOverlay() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div 
      className={cn(
        "grain-overlay fixed inset-0 w-full h-full pointer-events-none z-[10] opacity-[0.05]",
        "before:absolute before:inset-0 before:w-[300%] before:h-[300%] before:top-[-100%] before:left-[-100%]",
        "before:bg-[size:200px] before:animate-[grain-shift_8s_steps(10)_infinite]"
      )}
    />
  );
}
