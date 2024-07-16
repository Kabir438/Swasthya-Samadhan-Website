"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";
import { Suspense, useRef, useState } from "react";
import Header from "@/components/header";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import Lightbox from "yet-another-react-lightbox";
import ReactImageVideoviewer from "react-image-video-viewer";

import {
  Loader,
  PerformanceMonitor,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import Phone from "./_phone";
import useViewport from "@/hooks/useViewport";
import Footer, {
  DESKTOP_FOOTER_HEIGHT,
  MOBILE_FOOTER_HEIGHT,
} from "@/components/footer";
import { poppins } from "@/assets/fonts";
import useMediaQuery from "@/hooks/useMediaQuery";
import DownloadSection from "./_sections/download";
import { useGetBentoSize } from "@/components/bento-grid";
import useMount from "@/hooks/useMount";
import { Icon } from "@iconify/react/dist/iconify.js";

const Typewriter = dynamic(() => import("@/components/typewriter"));
const BentoGrid = dynamic(() => import("@/components/bento-grid"));
const LampContainer = dynamic(() => import("@/components/ui/lamp"));

export default function Home() {
  const [dpr, setDpr] = useState(1.2);
  const mainRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 625px)");
  const bentoSectionHeight = useGetBentoSize();
  const verticalLamp = useMediaQuery("(max-width: 768px)");

  const [openLightbox, setOpenLightbox] = useState(false);
  const viewport = useViewport();

  useMount(() => {
    document.body.style.overflowY = "hidden";
    document.body.style.height = "100vh";
    // .add("overflow-y-hidden h-screen")
  });
  return (
    <>
      <Header />
      {(openLightbox) && <ReactImageVideoviewer
        data={[
          {
            url: "https://www.youtube.com/embed/3tdaMVsEsIw",
            type: "video",
            title: "Pitch Video",
          },
          {
            url: "https://www.youtube.com/embed/Nlt4CQHtM-0",
            type: "video",
            title: "Testimonial Video",
          },
          {
            url: "https://www.youtube.com/embed/a5xixlYGa3Y",
            type: "video",
            title: "Demo Video",
          },
        ]}
        startIndex={0}
        showResourceCount={false}
        onCloseCallback={() => setOpenLightbox(false)}
        // onNavigationCallback={(currentIndex) =>
        //   console.log(`Current index: ${currentIndex}`)
        // }
      />}
      <Canvas
        className="w-full"
        style={{
          height: "100vh",
        }}
        // frameloop="demand"
        // shadows
        dpr={[1, 1.15]}
        camera={{
          zoom: 6.5,
          bottom: 60,
          top: 100,
          fov: 80,
        }}
      >
        <PerformanceMonitor
          onChange={({ factor }) =>
            setDpr(Number((0.5 + 1.5 * factor).toPrecision(2)))
          }
        >
          <ScrollControls
            // enabled
            pages={
              3 +
              0.5 * (verticalLamp ? 1 : 0) +
              bentoSectionHeight / viewport.height +
              (64 +
                (isDesktop ? DESKTOP_FOOTER_HEIGHT : MOBILE_FOOTER_HEIGHT)) /
                viewport.height
            }
          >
            <Phone />
            {/* @ts-ignore */}
            <Scroll html className="hi">
              <main
                ref={mainRef}
                className={cn(
                  "end-scroll px-4 md:px-0 lg:px-4 md:pr-12 sm:px-8 min-h-[250vh] sm:min-h-[200vh] max-h-max md:max-h-[200vh] md:flex-row flex-col justify-between pb-0 flex items-stretch overflow-hidden bg-transparent"
                )}
              >
                {/* Left Side */}
                <div className="flex flex-col items-center md:items-start lg:items-center space-between h-full lg:w-1/2 md:w-3/4">
                  {/* Top Left */}
                  <div
                    className="flex flex-col items-center sm:items-start pl-0 lg:pl-0 md:pl-12 md:max-h-none md:px-0 px-5 min-h-[calc(100vh-64px)] md:min-h-screen w-min sm:w-full md:w-auto justify-end pb-16 lg:pb-0 md:justify-center"
                    style={
                      {
                        // boxShadow: "0px 0px 55px 20px black",
                      }
                    }
                  >
                    <Link
                      rel="noreferrer"
                      href={"/redirect?promoter=website_front_page"}
                      className="relative sm:shadow-[initial] !shadow-none z-[6] self-start sm:self-auto underline w-max"
                      style={{
                        textDecorationSkipInk: "all",
                        textDecorationThickness: "1px",
                        textUnderlineOffset: "1.5px",
                        boxShadow: "black 2px -22px 20px 20px",
                        // background: "black",
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
                      className="md:mr-6 w-max md:w-auto flex flex-col items-start relative z-[5] justify-between gap-2"
                      style={
                        {
                          // boxShadow:
                          //   "20px 0px 55px 0px black, -20px 0px 55px 0px black",
                          // background: "black",
                        }
                      }
                    >
                      <h1
                        className={cn(
                          "z-[1] text-center sm:text-left sm:text-6xl md:text-7xl text-5xl relative",
                          poppins.className
                        )}
                      >
                        Your Health
                        <span className="text-[#ff8a97]">,</span>
                      </h1>
                      <h2
                        className={cn(
                          "z-[1] sm:text-6xl md:text-7xl text-5xl relative",
                          poppins.className
                        )}
                      >
                        <span className="text-[#ff8a97]">Our</span> Priority
                      </h2>
                    </div>
                    <p
                      className="mt-3 text-justify w-full sm:w-[75%] relative z-[2]"
                      style={{
                        boxShadow: "0px 0px 55px 20px black",
                        background: "black",
                      }}
                    >
                      Pioneer in the free health industry, harnessing the power
                      of AI.
                    </p>
                    <GlowButton
                      className="w-max mt-[25px] relative z-[1] flex items-center gap-2"
                      onClick={() => setOpenLightbox(true)}
                      style={{
                        boxShadow: "0px 0px 55px 20px black",
                        background: "black",
                      }}
                    >
                      <Icon icon="carbon:play" />
                      Watch the Videos
                    </GlowButton>
                  </div>
                  {/* Bottom Left */}
                  <div className="w-full h-1/2" id="languages">
                    <div className="w-full">
                      <LampContainer>
                        <Typewriter />
                      </LampContainer>
                    </div>
                  </div>
                </div>
                {/* Right */}
                <div className="flex relative flex-col items-center space-between min-h-full lg:w-1/2 md:w-1/4">
                  <motion.div
                    className="w-[50vw] min-h-[100vh] absolute left-1/2 -translate-x-1/2"
                    style={{
                      // y: phoneParallax,
                      x: "-50%",
                    }}
                  >
                    {/* <CarComponent scrollYProgress={scrollYProgress} /> */}
                    {/* <Phone scrollYProgress={scrollYProgress}>
              <SSHomePage bubbleWidth={0} contentOpacity={0} scrollYProgress={scrollYProgress}></SSHomePage>
            </Phone> */}
                    {/* <Phone /> */}
                  </motion.div>
                </div>
              </main>

              <BentoGrid />

              <DownloadSection />

              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </Scroll>
          </ScrollControls>
        </PerformanceMonitor>
      </Canvas>
      <Loader
        containerStyles={{
          backgroundColor: "rgb(72,35,51)",
          backgroundImage:
            "radial-gradient(at left bottom, #1a000b 0%, #120007 47%, rgba(2,0,36,1) 100%)",
        }}
        barStyles={{
          backgroundColor: "rgb(72,35,51)",
          backgroundImage:
            "linear-gradient(to right, #ff036c 0%, #ff2323 100%)",
          // transform: "scale(3) scaleY(0.75) translateX(-33%)",
          borderRadius: "100px",
        }}
        innerStyles={{
          transform: "scale(3)",
        }}
      />
    </>
  );
}
