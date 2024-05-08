"use client";
import React from "react";
import {
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/utils/cn";

export function LampDemo() {
  const { scrollYProgress } = useScroll();
  return (
    <LampContainer scrollYProgress={scrollYProgress}>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

const LampContainer = ({
  children,
  className,
  scrollYProgress,
}: {
  children: React.ReactNode;
  className?: string;
  scrollYProgress: MotionValue<number>;
}) => {
  const opacity1 = useTransform(scrollYProgress, [0.5, 1], [0.5, 1]);
  const width1 = useMotionTemplate`${useTransform(
    scrollYProgress,
    [0.5, 1],
    [15, 30]
  )}rem`;
  const width2 = useMotionTemplate`${useTransform(
    scrollYProgress,
    [0.5, 1],
    [8, 16]
  )}rem`;
  const width3 = useMotionTemplate`${useTransform(
    scrollYProgress,
    [0.5, 1],
    [15, 30]
  )}rem`;
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center bg-black w-full rounded-md z-",
        className
      )}
    >
      <div className="relative scale-x-90 flex w-full flex-1 scale-y-125 items-center justify-center isolate z- ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            width: width1,
            opacity: opacity1,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-red-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-black h-40 bottom-0 z-2 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-black  bottom-0 z-2 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            width: width1,
            opacity: opacity1,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-red-400 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-black  bottom-0 z-2 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-black h-40 bottom-0 z-2 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
        <div className="absolute top-1/2 z-5 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-5 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-red-400 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          style={{
            width: width2,
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-3 h-36 w-64 -translate-y-[6rem] rounded-full bg-red-300 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          style={{ width: width3 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-5 h-0.5 w-[30rem] -translate-y-[7rem] bg-red-00 "
        ></motion.div>

        <div className="absolute inset-auto z-4 h-44 w-full -translate-y-[12.5rem] bg-black "></div>
      </div>

      <div className="relative z-5 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

export default LampContainer;