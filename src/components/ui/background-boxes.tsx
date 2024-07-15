"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0, boxSize: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const minBoxSize = 50; // Minimum box size for smaller devices
      const maxBoxSize = 100; // Maximum box size for larger devices

      // Adjust the base box size dynamically
      const baseBoxSize = Math.max(minBoxSize, Math.min(maxBoxSize, window.innerWidth / 10));

      const cols = Math.floor(window.innerWidth / baseBoxSize);
      const rows = Math.floor(window.innerHeight / baseBoxSize);
      const adjustedBoxSize = Math.min(window.innerWidth / cols, window.innerHeight / rows);

      setDimensions({ rows, cols, boxSize: adjustedBoxSize });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const colors = [
    "--#86d3ea",
    "--#86d3ea",
    "--#86d3ea",
    "--#f5bf22",
    "--#f5bf22",
    "--#f5bf22",
    "--#f3cc15",
    "--#f3cc15",
    "--#f3cc15",
    "--#f5bf22",
    "--#f5bf22",
    "--#f5bf22",
    "--#f3cc15",
    "--#f3cc15",
    "--#f3cc15",
    "--#2b2a28",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 w-full h-full overflow-hidden", // Adjusted to fixed position to ensure it covers the viewport
        className
      )}
      {...rest}
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${dimensions.rows}, ${dimensions.boxSize}px)`,
        gridTemplateColumns: `repeat(${dimensions.cols}, ${dimensions.boxSize}px)`,
      }}
    >
      {Array.from({ length: dimensions.rows }).map((_, i) => (
        <React.Fragment key={`row` + i}>
          {Array.from({ length: dimensions.cols }).map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(${getRandomColor()})`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="border-r border-t border-slate-700"
              style={{ width: dimensions.boxSize, height: dimensions.boxSize }}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
