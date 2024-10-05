import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true); // Default to true for SSR
  const [pointerTitle, setPointerTitle] = useState<string | React.ReactNode>(
    title || ""
  );
  const [pointerColor, setPointerColor] = useState<string>("");

  useEffect(() => {
    const updateRect = () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    };
    updateRect();

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };
    checkMobile();

    window.addEventListener("resize", () => {
      updateRect();
      checkMobile();
    });
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rect && !isMobile) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      x.set(e.clientX - rect.left + scrollX);
      y.set(e.clientY - rect.top + scrollY);
    }
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsInside(true);
      setPointerTitle(getRandomTitle());
      setPointerColor(getRandomColor());
    }
  };

  const getRandomTitle = () => {
    const titles = [
      "Amazing You",
      "Cool You",
      "Meeple",
      "Cutie",
      "Pretty You",
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomColor = () => {
    const colors = ["#86d3ea", "#f5bf22", "#86d3ea"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      style={{ cursor: isMobile ? "default" : "none" }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && !isMobile && (
          <FollowPointer x={x} y={y} title={pointerTitle} color={pointerColor} />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
  color,
}: {
  x: any;
  y: any;
  title?: string | React.ReactNode;
  color: string;
}) => {
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke="currentColor"
        fill="#f5bf22"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 text-sky-500 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-black"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{ backgroundColor: color }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className="px-2 py-2 bg-neutral-200 text-gray-900 font-semibold border-solid border border-gray-900 whitespace-nowrap min-w-max text-sm rounded-full"
      >
        {title || `Default Title`}
      </motion.div>
    </motion.div>
  );
};
