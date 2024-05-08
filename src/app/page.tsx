"use client";
import { cn } from "@/utils/cn";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Phone, { useSmooth } from "@/components/phone";
import SSHomePage from "@/components/ss-home-page";
import { GlowButton } from "@/components/ui/glow-button";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Header from "@/components/header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Android from "@/components/badges/android";
import IOS from "@/components/badges/ios";
import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("@/components/typewriter"));
const BentoGrid = dynamic(() => import("@/components/bento-grid"));
const WavyBackground = dynamic(() => import("@/components/wavy"));
const LampContainer = dynamic(() => import("@/components/ui/lamp"));

const poppins = Poppins({
  weight: "600",
  subsets: ["latin-ext"],
});

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const typewriterStarted = useRef(false);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    // offset: ["start start", "end start"],
  });
  const [bubbleWidth, setBubbleWidth] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.9 && !typewriterStarted.current) {
      setStart(true);
    }
    if (value >= 0.9 && bubbleWidth <= 0) {
      setBubbleWidth(490);
      setContentOpacity(1);
    } else if (value < 0.9 && bubbleWidth > 0) {
      setBubbleWidth(0);
      setContentOpacity(0);
    }
  });
  return (
    // <SmoothScroll>
    <>
      <Header />
      <main
        ref={mainRef}
        className={cn(
          "px-12 min-h-[200vh] justify-between pb-0 flex flex-col items-center overflow-hidden bg-black"
        )}
      >
        <div
          className={cn(
            `px-12 w-screen max-h-[100vh] min-h-[100vh] pb-16 flex items-center justify-between`
          )}
          style={{
            perspective: "2100px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="flex flex-col"
            style={{
              boxShadow: "0px 0px 55px 20px black",
              background: "black",
            }}
          >
            <Link
              href={"/redirect?promoter=website_front_page"}
              className="relative z-[6] underline w-max"
              style={{
                textDecorationSkipInk: "all",
                textDecorationThickness: "1px",
                textUnderlineOffset: "1.5px",
                boxShadow: "black 2px -22px 20px 20px",
                background: "black",
              }}
            >
              <span
                className=""
                style={{
                  color: "#cccccc",
                  background:
                    "linear-gradient(90deg, #7c7c7c, #d3d3d3, #7c7c7c)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Download the app now
              </span>
            </Link>
            <div
              className="mr-6 flex flex-col items-start relative z-[5] justify-between gap-2"
              style={{
                boxShadow: "20px 0px 55px 0px black, -20px 0px 55px 0px black",
                background: "black",
              }}
            >
              <h1 className={cn("z-[1] text-7xl relative", poppins.className)}>
                Your Health
                <span className="text-[#ff8a97]">,</span>
              </h1>
              <h2 className={cn("z-[1] text-7xl relative", poppins.className)}>
                <span className="text-[#ff8a97]">Our</span> Priority
              </h2>
            </div>
            <p
              className="mt-3 text-justify w-[75%] relative z-[2]"
              style={{
                boxShadow: "0px 0px 55px 20px black",
                background: "black",
              }}
            >
              Pioneer in the free health industry, harnessing the power of AI.
            </p>
            <GlowButton
              className="w-max mt-[25px] relative z-[1]"
              style={{
                boxShadow: "0px 0px 55px 20px black",
                background: "black",
              }}
            >
              Become a Promoter
            </GlowButton>
          </div>
          <Phone {...{ scrollYProgress }}>
            {/* <></> */}
            <SSHomePage
              {...{
                scrollYProgress,
                bubbleWidth,
                contentOpacity,
              }}
            />
          </Phone>
        </div>
        {/* <div className="w-screen h-screen">
          <div className="w-1/2">
            <LampContainer scrollYProgress={scrollYProgress}>
              <Typewriter start={start} started={typewriterStarted} />
            </LampContainer>
          </div>
        </div> */}
      </main>
      {/* <div className="w-screen bg-black h-screen py-8 px-6 flex flex-col items-start justify-center">
        <BentoGrid />
      </div>
      <div className="w-screen relative top-[90px] bg-black h-screen py-8 px-24 flex flex-col items-start justify-center">
        <WavyBackground>
          <h1 className="mb-5 text-5xl">Download the App</h1>
          <div className="flex items-center justify-between gap-4 h-14 w-max">
            <Button className="border-[0px] bg-transparent w-max p-[0px] min-w-max min-h-max h-full">
              <Android
                style={{
                  maxHeight: "100%",
                  minHeight: "100%",
                  maxWidth: "100%",
                  width: "100%",
                }}
                width={"135"}
                height={"40"}
              />
            </Button>
            <Button className="border-[0px] bg-transparent w-max p-[0px] min-w-max min-h-max h-full">
              <IOS
                style={{
                  maxHeight: "100%",
                  minHeight: "100%",
                  maxWidth: "100%",
                  width: "100%",
                }}
              />
            </Button>
          </div>
        </WavyBackground>
      </div> */}
    </>
    // </SmoothScroll>
  );
}
