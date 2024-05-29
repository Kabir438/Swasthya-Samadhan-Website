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
  return (
    <LampContainer>
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
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex md:min-h-screen min-h-[50vh] overflow-y-hidden overflow-x-auto bg-transparent md:overflow-hidden lg:overflow-auto flex-col items-start lg:rounded-tr-none md:rounded-tr-[341.1px] lg:items-center justify-center w-full rounded-md",
        className
      )}
    >
      <div className="relative flex w-full scale-x-[0.6] md:scale-x-75 lg:scale-95 flex-1 md:scale-y-90 scale-y-100 items-center justify-center isolate z- ">
        <motion.div
          // initial={{ opacity: 0.5, width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {
              opacity: 0.5,
              width: "15rem",
            },
            visible: {
              width: "30rem",
              opacity: 1,
            },
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-red-400 via-transparent to-transparent text-white [--conic-position:from_16deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-transparent h-40 bottom-0 z-2 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-transparent  bottom-0 z-2 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {
              opacity: 0.5,
              width: "15rem",
            },
            visible: {
              width: "30rem",
              opacity: 1,
            },
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-red-400 text-white [--conic-position:from_344deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-transparent  bottom-0 z-2 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-transparent h-40 bottom-0 z-2 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-[90px] blur-[25px] sm:h-48 w-full translate-y-12 scale-x-150 bg-black sm:blur-2xl"></div>
        <div className="absolute top-1/2 z-5 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-5 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-red-400 opacity-50 blur-3xl"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {
              width: "8rem",
            },
            visible: {
              width: "16rem",
            },
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-3 h-36 w-64 -translate-y-[6rem] rounded-full bg-red-300 blur-2xl"
        ></motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {
              width: "15rem",
            },
            visible: {
              width: "30rem",
            },
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-5 h-0.5 w-[30rem] -translate-y-[7rem] bg-red-00 "
        ></motion.div>

        <div className="absolute inset-auto sm:scale-x-100 scale-x-[2] w-full z-4 h-44 -translate-y-[12.5rem] bg-black "></div>
      </div>

      <div className="relative z-5 flex -translate-y-[50px] sm:-translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

export default LampContainer;
