import Pellet from "@/app/_phone/pellet";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGLTF } from "@react-three/drei";
import React, {
  ComponentProps,
  HTMLAttributes,
  SVGProps,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Youtube from "../icons/youtube";
import { Button } from "../ui/button";
import Link from "next/link";
import Linkedin from "../icons/linkedin";
import Instagram from "../icons/instagram";
import Play from "../icons/play";
import useMediaQuery from "@/hooks/useMediaQuery";

export const DESKTOP_FOOTER_HEIGHT = 384;
export const MOBILE_FOOTER_HEIGHT = 524;
const socialMediaIcons: {
  name: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
  props?: SVGProps<SVGSVGElement>;
  to: string;
}[] = [
  {
    name: "youtube",
    icon: Youtube,
    props: {
      color: "red",
    },
    to: "https://www.youtube.com/channel/UCL-2333333333",
  },
  {
    name: "instagram",
    icon: Instagram,
    to: "https://www.youtube.com/UCL-2333333333",
    props: {
      className: "scale-125",
    },
  },
  {
    name: "linkedin",
    icon: Linkedin,
    props: {
      style: {
        color: "#0b64be",
      },
    },
    to: "https://www.youtube.com/UCL-2333333333",
  },
  {
    name: "play",
    icon: Play,
    props: {
      style: {
        aspectRatio: "0.91 / 1",
      },
      className: "w-5/6 h-5/6",
    },
    to: "https://play.google.com/store/apps/details?id=com.swasthyasamadhan.app",
  },
];

export default function Footer() {
  const [actualFooter, setActualFooter] = useState<HTMLDivElement | null>(null);
  const isDesktop = useMediaQuery("(min-width: 625px)");
  const { scene } = useGLTF("/models/pellet/pellet.gltf");

  const slot = actualFooter?.parentElement?.parentElement;
  console.log(slot);
  return (
    <>
      <div
        id="mask-footer"
        className={`w-screen h-0 -z-[1] relative`}
        style={{
          // height: FOOTER_HEIGHT + "px",
          backgroundImage: "black",
        }}
        ref={(el) => setActualFooter(el)}
      ></div>
      {slot &&
        createPortal(
          <footer
            id="actual-footer"
            className={cn(
              `w-screen overflow-x-hidden px-3 overflow-y-scroll -z-[2] gap-2 pt-[40px] flex items-center opacity-0 absolute bottom-0`,
              !isDesktop ? "flex-col justify-center" : "justify-evenly"
            )}
            style={{
              height: isDesktop
                ? DESKTOP_FOOTER_HEIGHT
                : MOBILE_FOOTER_HEIGHT + "px",
              backgroundImage:
                "linear-gradient(0deg, rgb(44, 0, 9) 10%, black 90%)",
            }}
          >
            <Pellet scene={scene} />
            <div className="flex flex-col gap-3 items-center justify-center h-max">
              <div className="h-10 w-0"></div>
              <div className="text-center">
                © Copyright 2024. All right reserved
              </div>
              <div className="flex gap-2 h-10 items-center justify-center">
                {socialMediaIcons.map(({ props, to, name, ...iconConfig }) => (
                  <a rel="noreferrer" href={to} key={name}>
                    <Button
                      // asChild
                      variant={"ghost"}
                      className="aspect-square p-2 rounded-full hover:bg-slate-900 bg-black"
                    >
                      <iconConfig.icon
                        {...props}
                        className={cn("w-full h-full", props?.className)}
                      ></iconConfig.icon>
                    </Button>
                  </a>
                ))}
              </div>
            </div>
            <div
              className={cn("relative left-0 !w-48 !h-48", isDesktop ? "" : "hidden")}
            />
          </footer>,
          slot
        )}
    </>
  );
}

useGLTF.preload("/models/pellet/pellet.gltf");
