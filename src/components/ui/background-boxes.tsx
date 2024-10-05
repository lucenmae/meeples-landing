"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, useMemo } from "react";

import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0, boxSize: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth <= 768;
      const minBoxSize = isMobile ? 25 : 50;
      const maxBoxSize = isMobile ? 50 : 100;
      const baseBoxSize = Math.max(minBoxSize, Math.min(maxBoxSize, window.innerWidth / (isMobile ? 5 : 10)));

      const cols = Math.floor(window.innerWidth / baseBoxSize);
      const rows = Math.floor(window.innerHeight / baseBoxSize);
      const adjustedBoxSize = Math.min(window.innerWidth / cols, window.innerHeight / rows);

      setDimensions({ rows, cols, boxSize: adjustedBoxSize });
      setIsLoading(false);
    };

    // Use requestAnimationFrame for smoother initial render
    requestAnimationFrame(updateDimensions);

    const debouncedResize = debounce(updateDimensions, 250);
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  const colors = useMemo(() => [
    "#86d3ea", "#f5bf22", "#f3cc15", "#2b2a28"
  ], []);

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const boxes = useMemo(() => {
    return Array.from({ length: dimensions.rows * dimensions.cols }).map((_, index) => (
      <motion.div
        key={index}
        className="border-r border-t border-slate-700"
        whileHover={{
          backgroundColor: getRandomColor(),
          transition: { duration: 0 },
        }}
      />
    ));
  }, [dimensions, getRandomColor]);

  if (isLoading) {
    return <div className="fixed left-0 top-0 w-full h-full bg-[#F3F3F3]" />;
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 w-full h-full overflow-hidden",
        className
      )}
      {...rest}
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${dimensions.rows}, ${dimensions.boxSize}px)`,
        gridTemplateColumns: `repeat(${dimensions.cols}, ${dimensions.boxSize}px)`,
      }}
    >
      {boxes}
    </div>
  );
};

// Debounce function to limit the frequency of resize events
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const Boxes = React.memo(BoxesCore);
