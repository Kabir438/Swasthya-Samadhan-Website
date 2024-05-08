"use client";
import React from "react";
import { cubicBezier, motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  let colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--yellow-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className={cn("absolute left-0 top-0 flex w-full h-full z-0", className)}
      {...rest}
    >
      {rows.map((_, i) => (
        <div
          key={`row` + i}
          className="w-[47.1px] h-full border-l border-[transparent] relative"
        >
          {cols.map((_, j) => (
            <motion.div
              key={`col` + j}
              whileHover={{
                stroke: `#ff7d7d`,
                strokeWidth: 40,
                transition: {
                  duration: 0,
                  // ease: cubicBezier(0.72, 1.02, 0.85, 1.69),
                  ease: cubicBezier(0.72, 1.02, 0.85, 1.69),
                },
              }}
              animate={{
                transition: {
                  duration: 2,
                },
              }}
              style={{
                stroke: "#ffe8e887",
              }}
              className="stroke-[0px]"
            >
              <motion.svg
                viewBox="0 0 726 628"
                width="49.1"
                height="56.45"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  borderRadius: "0px",
                  // marginTop: "4px",
                  marginTop: i % 2 === 0 && j === 0 ? "27.225px" : "0px",
                  stroke: "inherit",
                  strokeWidth: "inherit",
                }}
                className="w-[40.9565217391px] h-[47.347826087px] border-2 border-transparent relative stroke-black"
              >
                <motion.polygon
                  points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314"
                  style={{
                    fill: "none",
                    stroke: "inherit",
                    strokeWidth: "inherit",
                  }}
                ></motion.polygon>
              </motion.svg>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
