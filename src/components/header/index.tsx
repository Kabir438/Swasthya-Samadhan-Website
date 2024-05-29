"use client";
import Link from "next/link";
import Image from "next/image";
import { ShimmerButton } from "../ui/shimmer-button";
import Hamburger from "../hamburger";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useScroll } from "@react-three/drei";
import gsap from "gsap";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Header() {
  const hamburgerRef = useRef<SVGSVGElement>(null);
  const desktop = useMediaQuery("(min-width: 768px)"); 
  const scroll = useScroll();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toggle = useCallback(
    () =>
      setOpen((prev) => {
        if(desktop) return !prev;
        if (prev) {
          hamburgerRef.current?.classList.remove("active");
        } else {
          hamburgerRef.current?.classList.add("active");
        }
        return !prev;
      }),
    [setOpen, desktop]
  );
  return (
    <header
      className="flex relative h-16 bg-black w-full items-center justify-between z-[1] shadow-none md:pr-4 pr-0 px-4 md:px-6 dark:bg-black"
      style={{
        boxShadow: "0px 0px 55px 20px #000000",
      }}
    >
      {/* <div className="absolute w-full h-full bg-black left-0 z-[99999] block sm:hidden"></div> */}
      <div
        className={cn(
          "fixed z-[99998] rounded-[max(10000vw,10000vh)] right-0 left-[unset] translate-x-1/2 -translate-y-1/2 top-0 bg-black transition-all [transition-duration:2000ms]",
          open ? "w-[max(400vw,400vh)] h-[max(400vw,400vh)] " : "w-0 h-0"
        )}
      ></div>
      <div
        className={cn(
          "group w-screen h-screen left-[1px] top-0 pt-[212px] fixed z-[99999] gap-8 flex flex-col items-start px-5 py-16 justify-start",
          open ? "w-screen h-screen open" : "w-0 h-0 invisible"
        )}
      >
        <div
          onClick={() => {
            if (location.pathname !== "/") {
              router.push("/");
            }
            toggle();
          }}
          className="text-5xl uppercase text-[#ffcece] font-extrabold transition-all group-[.open]:[transition-delay:800ms] [transition-delay:450ms] -rotate-x-[90deg] origin-top rotate-0 opacity-0 group-[.open]:ease-out ease-in group-[.open]:opacity-100 group-[.open]:rotate-x-0"
        >
          Home
        </div>
        <div
          onClick={() => {
            if (location.pathname !== "/about") {
              router.push("/about");
            }
            toggle();
          }}
          className="text-5xl uppercase text-[#ffcece] font-extrabold transition-all group-[.open]:[transition-delay:800ms] [transition-delay:450ms] -rotate-x-[90deg] origin-top rotate-0 opacity-0 group-[.open]:ease-out ease-in group-[.open]:opacity-100 group-[.open]:rotate-x-0"
        >
          About
        </div>
        <div
          onClick={() => {
            const scroller =
              document.querySelector(".hi")?.parentElement?.parentElement;
            if (!scroller) return;
            toggle();
            setTimeout(() => {
              gsap.to(scroller, {
                scrollTop:
                  document.getElementById("languages")!.getBoundingClientRect()
                    .y + scroller.scrollTop,
                duration: 1,
              });
            }, 1500);
          }}
          className="text-5xl uppercase text-[#ffcece] font-extrabold transition-all group-[.open]:[transition-delay:900ms] [transition-delay:250ms] -rotate-x-[90deg] origin-top rotate-0 opacity-0 group-[.open]:ease-out ease-in group-[.open]:opacity-100 group-[.open]:rotate-x-0"
        >
          Languages
        </div>
        <div
          onClick={() => {
            const scroller =
              document.querySelector(".hi")?.parentElement?.parentElement;
            if (!scroller) return;
            toggle();
            setTimeout(() => {
              gsap.to(scroller, {
                scrollTop:
                  document.getElementById("features")!.getBoundingClientRect()
                    .y + scroller.scrollTop,
                duration: 1,
              });
            }, 1500);
          }}
          className="text-5xl uppercase text-[#ffcece] font-extrabold transition-all group-[.open]:[transition-delay:1050ms] [transition-delay:100ms] -rotate-x-[90deg] origin-top rotate-0 opacity-0 group-[.open]:ease-out ease-in group-[.open]:opacity-100 group-[.open]:rotate-x-0"
        >
          Features
        </div>
        {/* <div className="text-5xl uppercase text-[#ffcece] font-extrabold transition-all group-[.open]:[transition-delay:1250ms] [transition-delay:0ms] -rotate-x-[90deg] origin-top rotate-0 opacity-0 group-[.open]:ease-out ease-in group-[.open]:opacity-100 group-[.open]:rotate-x-0">
          Contact
        </div> */}
      </div>
      <Link
        rel="noreferrer"
        className="mr-4 md:mr-6 sm:z-[1] z-[99999] -translate-x-[10%] sm:-translate-x-0 scale-[0.8] sm:scale-100"
        href="#"
      >
        <Image
          src={"/logos/english.png"}
          alt={"Logo"}
          width={1912 / 5.5}
          height={278 / 5.5}
        />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <Hamburger
        ref={hamburgerRef}
        toggle={toggle}
        className="block md:hidden"
      />
      <div className="flex-1 justify-end hidden md:flex gap-3">
        <nav className="flex items-center space-x-4">
          <Link
            rel="noreferrer"
            className="flex items-center z-[1] transition-colors hover:text-gray-500 dark:hover:text-gray-400"
            href="/"
          >
            Home
          </Link>
          <Link
            rel="noreferrer"
            className="flex items-center z-[1] transition-colors hover:text-gray-500 dark:hover:text-gray-400"
            href="/about"
            
          >
            About
          </Link>
          <Link
            rel="noreferrer"
            className="flex items-center z-[1] transition-colors hover:text-gray-500 dark:hover:text-gray-400"
            href="#"
            onClick={() => {
              const scroller =
                document.querySelector(".hi")?.parentElement?.parentElement;
              if (!scroller) return;
              gsap.to(scroller, {
                scrollTop:
                  document.getElementById("languages")!.getBoundingClientRect()
                    .y + scroller.scrollTop + 128,
                duration: 1,
              });
            }}
          >
            Languages
          </Link>
          <Link
            rel="noreferrer"
            className="flex items-center z-[1] transition-colors hover:text-gray-500 dark:hover:text-gray-400"
            href="#"
            onClick={() => {
              const scroller =
                document.querySelector(".hi")?.parentElement?.parentElement;
              if (!scroller) return;
              gsap.to(scroller, {
                scrollTop:
                  document.getElementById("features")!.getBoundingClientRect()
                    .y + scroller.scrollTop + 128,
                duration: 1,
              });
            }}
          >
            Features
          </Link>
          {/* <Link
            rel="noreferrer"
            className="flex items-center z-[1] transition-colors hover:text-gray-500 dark:hover:text-gray-400"
            href="#"
          >
            Contact
          </Link> */}
        </nav>
        <ShimmerButton>Download the App</ShimmerButton>
      </div>
    </header>
  );
}
