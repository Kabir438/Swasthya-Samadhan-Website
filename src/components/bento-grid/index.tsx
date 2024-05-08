"use client";
import { cn } from "@/utils/cn";
import React, { useCallback, useEffect } from "react";
import { BentoGridTemplate, BentoGridItem } from "./template";
import {
  IconAccessible,
  IconAccessibleFilled,
  IconAnalyze,
  IconAnalyzeFilled,
  IconBoxAlignRightFilled,
  IconBuildingHospital,
  IconClipboardCopy,
  IconFileBroken,
  IconHeartbeat,
  IconMedicalCrossFilled,
  IconReportAnalytics,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Veterinary from "../icons/veterinary";
import Hospital from "../icons/hospital";
import Doctor from "../icons/doctor";

export default function BentoGrid() {
  const eventListener = useCallback((e: MouseEvent) => {
    const cards = document.getElementsByClassName(
      "card"
    ) as HTMLCollectionOf<HTMLDivElement>;
    if (!cards) return;
    for (const card of Array.from(cards)) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  }, []);
  useEffect(() => {
    const cards = document.getElementById("cards");
    cards && cards.addEventListener("mousemove", eventListener);
    return () => {
      cards && cards.removeEventListener("mousemove", eventListener);
    };
  }, [eventListener]);
  return (
    <BentoGridTemplate className="max-w-4xl md:auto-rows-[20rem]">
      <h1
        className="col-span-3 text-7xl font-bold row-span-1 mx-auto"
        style={{
          width: "100%",
          height: "max-content",
          placeSelf: "flex-end",
        }}
      >
        Features
      </h1>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className, "card")}
          icon={item.icon}
        />
      ))}
    </BentoGridTemplate>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div
          className={"h-6 w-6 rounded-full"}
          style={{
            backgroundImage: 'url("qr-icon-logo.png")',
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div
          className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
          style={{
            backgroundImage: 'url("person-1.jpeg")',
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div
          className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0"
          style={{
            backgroundImage: 'url("qr-icon-logo.png")',
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = [
    {
      name: "Rana Veterinary Care",
      icon: ({ style, ...others }: React.SVGProps<SVGSVGElement>) => (
        <Veterinary
          style={{
            width: "2rem",
            height: "2rem",
            ...style,
          }}
          {...others}
        />
      ),
    },
    {
      name: "Deep Hospital",
      icon: ({ style, ...others }: React.SVGProps<SVGSVGElement>) => (
        <Hospital
          style={{
            width: "3rem",
            height: "3rem",
            ...style,
          }}
          {...others}
        />
      ),
    },
  ];
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 justify-center w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((item, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: i === 1 ? "80%" : "100%",
          }}
          className="flex overflow-hidden flex-row rounded-xl border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-16"
        >
          <div className="w-12 grid place-items-center min-w-12">
            {
              <item.icon
                style={{
                  fill: "#fff",
                }}
              />
            }
          </div>
          <div className="whitespace-nowrap">{item.name}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[10rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background: 'url("ai-bg.png")',
        backgroundSize: "cover",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Image
          src="/person-2.jpeg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          A poisonous snake bit me
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Emergency
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <Image
          src="/person-3.jpeg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          I have a cold
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Non-urgent
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Image
          src="/person-4.jpeg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          I have a second degree burn
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Severe
        </p>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <Image
          src="/person-5.jpeg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          To enhance the experience of the user, we can add features like...
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Make it simple.</p>
        <div
          className="h-6 w-6 rounded-full flex-shrink-0"
          style={{
            backgroundImage: 'url("qr-icon-logo.png")',
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "AI Medical Help",
    description: (
      <span className="text-sm">
        Experience the power of AI trained on 1B tokens of medical data.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconHeartbeat className="h-4 w-4 text-red-400" />,
  },
  {
    title: "Nearby Medical Services",
    description: (
      <span className="text-sm">
        Let AI handle the proofreading of your documents.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconBuildingHospital className="h-4 w-4 text-red-400" />,
  },
  {
    title: "Doctor Recommendation",
    description: (
      <span className="text-sm">Get AI-powered doctor recommendations.</span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <Doctor className="h-4 scale-[1.5] w-4 text-red-400" />,
  },
  {
    title: "Problem Analysis",
    description: (
      <span className="text-sm">
        Understand the type of help required with AI analysis.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconReportAnalytics className="h-4 w-4 text-red-400" />,
  },

  {
    title: "Accessibility",
    description: <span className="text-sm">Easy to use. Direct Answers.</span>,
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconAccessible className="h-4 w-4 text-red-400" />,
  },
];
