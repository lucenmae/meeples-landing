"use client";
import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(80).fill(1);
  const cols = new Array(80).fill(1);
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
        "absolute left-1/4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full -z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div key={`row` + i}>
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(${getRandomColor()})`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-20 h-20 border-r border-t border-slate-700 relative"
            >
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
