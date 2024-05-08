"use client";

import {
  MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { useSmooth } from "../phone";
import { Button } from "../ui/button";

const languages = [`English`, "हिंदी", "ਪੰਜਾਬੀ", "ગુજરાતી", "বাংলা", "తెలుగు"];

export default function SSHomePage({
  scrollYProgress,
  bubbleWidth,
  contentOpacity,
}: {
  scrollYProgress: MotionValue<number>;
  bubbleWidth: number;
  contentOpacity: number;
}) {
  const mainButtonTranslateX = useSmooth(
    useTransform(scrollYProgress, (syp) => (1 - syp) * -81)
  );
  const mainButtonTranslateY = useSmooth(
    useTransform(scrollYProgress, (syp) => (1 - syp) * -53)
  );
  const transform3D = useMotionTemplate`translate(${mainButtonTranslateX}px, ${mainButtonTranslateY}px)`;
  const pinkBoxShadow = useMotionValue("");
  const redBoxShadow = useMotionValue("");

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const newShadowPink =
      Array(81)
        .fill(null)
        .map(
          (_, i) =>
            `calc(${1 - value} * ${i}px) calc(${1 - value} * ${
              0.654321 * i
            }px) 0px 0px #ff8a97`
        )
        .join(", ") +
      `, rgb(0, 0, 0) calc(${1 - value} * 82px) calc(${
        1 - value
      } * 54px) 0px 0px`;
    const newShadowRed =
      Array(81)
        .fill(null)
        .map(
          (_, i) =>
            `calc(${1 - value} * ${i}px) calc(${1 - value} * ${
              0.654321 * i
            }px) 0px 0px #f66457`
        )
        .join(", ") +
      `, rgb(0, 0, 0) calc(${1 - value} * 82px) calc(${
        1 - value
      } * 54px) 0px 0px`;
    pinkBoxShadow.set(newShadowPink);
    redBoxShadow.set(newShadowRed);
  });

  const boxShadow3DPink = useMotionTemplate`${pinkBoxShadow}`;
  const boxShadow3DRed = useMotionTemplate`${redBoxShadow}`;

  const border2 = useSmooth(useTransform(scrollYProgress, (isy) => (1 - isy) * 2));
  const border4 = useSmooth(useTransform(scrollYProgress, (isy) => (1 - isy) * 4));
  const border4_2 = useSmooth(useTransform(scrollYProgress, (isy) => (1 - isy) * 2 + 2));
  return (
    <>
      <div
        style={{
          borderRadius: "inherit",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <motion.div
          style={{
            aspectRatio: "1 / 1",
            background: "#00000094",
            zIndex: 2,
            position: "relative",
            left: "100%",
            transform: "translate(-50%, -50%)",
            borderRadius: "100vw",
            width: `${bubbleWidth}%`,
            transition: "0.5s width ease-out",
          }}
        ></motion.div>
        <motion.div
          style={{
            opacity: contentOpacity,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            width: "80%",
            gap: "12px",
            transition: "0.25s opacity ease-out",
          }}
        >
          <div
            style={{ fontSize: "22px", fontWeight: "600", lineHeight: "1.25" }}
          >
            Do you want to watch the demo video?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              gap: "16px",
              width: "100%",
            }}
          >
            <Button className="w-[calc(100%-8px)] h-10 text-lg font-bold transition-all duration-300 ease bg-[#fecbc8] hover:bg-[#ffafab] active:bg-[#ff827c] p-0 rounded-[8px] border-[4px] border-black">
              <span className="w-full h-full rounded-[4px] grid place-items-center">
                No
              </span>
            </Button>
            <Button className="w-[calc(100%-8px)] h-10 text-lg font-bold transition-all duration-300 ease bg-[#ff7972] hover:bg-[#ff645c] active:text-white active:bg-[#ee2c22] p-0 rounded-[8px] border-[4px] border-black">
              <span className="w-full h-full rounded-[4px] grid place-items-center">
                Yes
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          paddingBottom: "9%",
          borderRadius: "inherit",
        }}
      >
        <div className="flex flex-col items-center justify-start w-full rounded-[inherit]">
          <header
            className="w-full top-0 pb-[2px] flex justify-between bg-[#fdccd2] h-[19%] pt-[8%]"
            style={{
              paddingRight: "2.25%",
              borderTopRightRadius: "inherit",
              borderTopLeftRadius: "inherit",
            }}
          >
            <motion.div
              className="h-full relative w-[74%] z-[1]"
              style={{
                boxShadow: boxShadow3DPink,
                transform: transform3D,
                border: "solid black",
                background: "#fdccd2",
                borderRadius: "8px",
                borderWidth: border2,
              }}
              initial={{
                boxShadow:
                  Array(81)
                    .fill(null)
                    .map((_, i) => `${i}px ${(53 / 81) * i}px 0px 0px #ff8a97`)
                    .join(", ") + ", rgb(0, 0, 0) 82px 54px 0px 0px",
                transform: `translate(-81px, -53px)`,
              }}
            >
              <Image
                style={{
                  objectFit: "contain",
                }}
                fill
                src={"/logos/english.png"}
                alt={"english logo"}
              />
            </motion.div>
            <motion.div
              className="aspect-square z-[1] relative flex flex-col justify-between rounded-md bg-[#fdccd2]"
              style={{
                height: "calc(85% + 10px)",
                width: "calc(18% + 10px)",
                padding: "3% 1.5%",
                transform: transform3D,
                boxShadow: boxShadow3DPink,
                borderWidth: border2,
              }}
              initial={{
                transform: `translate(-81px, -53px)`,
                boxShadow:
                  Array(81)
                    .fill(null)
                    .map(
                      (_, i) =>
                        `${i}px calc(calc((53 / 81)) * ${i}px) 0px 0px #ff8a97`
                    )
                    .join(", ") + ", rgb(0, 0, 0) 82px 54px 0px 0px",
              }}
            >
              <div
                className="w-full h-[18%] bg-[#eb1610] rounded-md"
                style={{
                  boxShadow:
                    "inset 1px 3px 4px #ff9393, inset -1px -1px 5px #a00000",
                }}
              />
              <div
                className="w-full h-[18%] bg-[#eb1610] rounded-md"
                style={{
                  boxShadow:
                    "inset 1px 3px 4px #ff9393, inset -1px -1px 5px #a00000",
                }}
              />
              <div
                className="w-full h-[18%] bg-[#eb1610] rounded-md"
                style={{
                  boxShadow:
                    "inset 1px 3px 4px #ff9393, inset -1px -1px 5px #a00000",
                }}
              />
            </motion.div>
          </header>
          <main className="w-full relative">
            <motion.aside
              className="grid relative z-[1] mx-2 mt-3 w-[calc(100%-1rem)] grid-columns-3 grid-rows-2 place-items-center p-1"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gridColumnGap: "4px",
                gridRowGap: "4px",
                borderRadius: "10px",
                overflow: "hidden",
                padding: "4px",
                background: "#f66457",
                border: "solid black",
                borderWidth: border4,
                transform: transform3D,
                boxShadow: boxShadow3DRed,
              }}
              initial={{
                boxShadow:
                  Array(81)
                    .fill(null)
                    .map((_, i) => `${i}px ${(53 / 81) * i}px 0px 0px #f66457`)
                    .join(", ") + ", rgb(0, 0, 0) 83px 55px 0px 0px",
                transform: `translate(-81px, -53px)`,
              }}
            >
              {languages.map((language, i) => (
                <div
                  className="w-full text-[90%] text-black bg-white h-8 flex items-center justify-center"
                  style={{
                    [i === 0
                      ? "borderTopLeftRadius"
                      : i === 2
                      ? "borderTopRightRadius"
                      : i === 3
                      ? "borderBottomLeftRadius"
                      : i === 5
                      ? "borderBottomRightRadius"
                      : "null"]: "6px",
                  }}
                  key={language}
                >
                  {language}
                </div>
              ))}
            </motion.aside>

            <motion.div
              className="rounded-full relative z-[1] grid place-items-center mx-auto mt-[10%] w-9/12 aspect-square bg-[#f66457]"
              style={{
                border: "solid black",
                borderWidth: border4,
                transform: transform3D,
                boxShadow: boxShadow3DRed,
              }}
              initial={{
                boxShadow:
                  Array(81)
                    .fill(null)
                    .map((_, i) => `${i}px ${(53 / 81) * i}px 0px 0px #f66457`)
                    .join(", ") + ", rgb(0, 0, 0) 83px 55px 0px 0px",
                transform: `translate(-81px, -53px)`,
              }}
            >
              <MicIcon
                style={{
                  width: "70%",
                  height: "70%",
                }}
              />
            </motion.div>
          </main>
        </div>
        <footer>
          <motion.div
            className="instructions mx-auto relative z-[1] w-10/12 bg-[#fecbc8]"
            style={{
              padding: "14px 18px",
              // boxShadow:
              //   "inset 4px 5px 10px #ffffff, inset -3px -2px 20px #ff1919",
              borderRadius: "17px",
              color: "black",
              textAlign: "center",
              fontSize: "23px",
              fontWeight: "600",
              border: "solid black",
              borderWidth: border4_2,
              transform: transform3D,
              boxShadow: boxShadow3DRed,
            }}
            initial={{
              boxShadow:
                Array(81)
                  .fill(null)
                  .map((_, i) => `${i}px ${(53 / 81) * i}px 0px 0px #f66457`)
                  .join(", ") + ", rgb(0, 0, 0) 83px 55px 0px 0px",
              transform: `translate(-81px, -53px)`,
            }}
          >
            For solutions to your health issues, press this button and speak.
          </motion.div>
        </footer>
      </div>
    </>
  );
}

function MicIcon({ style }: { style?: CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      color="white"
      style={style}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M192 448h128m64-240v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32m128 160v80"
      />
      <path
        fill="currentColor"
        d="M256 320a78.83 78.83 0 0 1-56.55-24.1A80.89 80.89 0 0 1 176 239V128a79.69 79.69 0 0 1 80-80c44.86 0 80 35.14 80 80v111c0 44.66-35.89 81-80 81"
      />
    </svg>
  );
}
