"use client";
import { cn } from "@/utils/cn";
import multiplyText from "@/utils/multiplyText";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import gearAnimation from "@/assets/animations/gear.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { updateDoc, setDoc, doc, increment, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Cookies from "js-cookie";
import useMount from "@/hooks/useMount";

function detectOS() {
  let userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os: "mac" | "ios" | "windows" | "android" | "other" | null = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "mac";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "ios";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "windows";
  } else if (/Android/.test(userAgent)) {
    os = "android";
  } else {
    os = "other";
  }

  return os;
}

export default function IndexPage() {
  const [appState, setAppState] = useState<
    "ios" | "redirect" | "options" | "loading"
  >("loading");
  const [multiplicant, setMultiplicant] = useState<1 | 2 | 3>(1);
  useMount(() => {
    document.body.classList.remove("dark");
    document.body.classList.remove("bg-background");
    document.body.classList.add("bg-white");
    const promoter = new URLSearchParams(window.location.search).get(
      "promoter"
    );
    const intervalId = setInterval(() => {
      setMultiplicant((prev) => {
        if (prev === 1) return 2;
        if (prev === 2) return 3;
        if (prev === 3) return 1;
        return 1;
      });
    }, 950);

    const os = detectOS();
    if (os === "ios") {
      setAppState("ios");
    } else if (os === "android") {
      setAppState("redirect");
      if (process.env.NEXT_PUBLIC_ANDROID_LINK) {
        window.location.href = process.env.NEXT_PUBLIC_ANDROID_LINK;
      }
    } else {
      setAppState("options");
    }

    if (Cookies.get("analytics")) {
      console.log("has done analytics");
      return () => {
        clearInterval(intervalId);
      };
    }

    getDoc(doc(db, `promoters/${promoter}`)).then((data) => {
      if (Cookies.get("analytics")) return;
      if (data.exists()) {
        updateDoc(doc(db, `promoters/${promoter}`), {
          count: increment(1),
        }).then(() => Cookies.set("analytics", `${new Date().getTime()}`));
      } else {
        setDoc(doc(db, `promoters/${promoter}`), {
          count: 1,
        }).then(() => Cookies.set("analytics", `${new Date().getTime()}`));
      }
    });

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <main className={cn("grid place-items-center w-screen h-screen")}>
      {appState === "loading" && (
        <div className="w-max flex flex-col items-center justify-center gap-8">
          <ThreeCircles
            visible={true}
            height="150"
            width="150"
            color="#ff6060"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <span className="text-white opacity-0 select-none">
              {multiplyText(".", multiplicant)}
            </span>
            Loading
            <span>{multiplyText(".", multiplicant)}</span>
          </h1>
        </div>
      )}
      {appState === "ios" && (
        <div className="w-max flex flex-col items-center justify-center gap-0">
          <div className="w-[400px] h-[225px] overflow-hidden grid place-items-center">
            <Lottie
              animationData={gearAnimation}
              loop={true}
              height={300}
              width={300}
            />
          </div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            We are Working on the IOS app
          </h1>
          <h2 className="scroll-m-20 text-2xl mt-2 font-extrabold tracking-tight lg:text-3xl">
            Please wait while we develop it.
          </h2>
        </div>
      )}
      {appState === "redirect" && (
        <div className="w-max flex flex-col items-center justify-center gap-8">
          <ThreeCircles
            visible={true}
            height="150"
            width="150"
            color="#ff6060"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <span className="text-white opacity-0 select-none">
              {multiplyText(".", multiplicant)}
            </span>
            Redirecting
            <span>{multiplyText(".", multiplicant)}</span>
          </h1>
        </div>
      )}
      {appState === "options" && (
        <Card className="max-w-[90vw] w-[32rem] px-4 py-7">
          <CardHeader className="p-0 pb-2 sm:p-3 items-center">
            <Image
              src={"/logo.png"}
              alt={"Logo"}
              width={1912 / 5.5}
              height={278 / 5.5}
            />
            <h1 className="scroll-m-20 text-center text-3xl sm:text-3xl font-bold tracking-tight lg:text-4xl">
              Download Swasthya Samadhan
            </h1>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-5 p-0">
            <a
              rel="noreferrer"
              href={process.env.NEXT_PUBLIC_ANDROID_LINK}
              className="w-full h-20 justify-start"
            >
              <Button
                variant="destructive"
                size={"lg"}
                style={{
                  fontSize: "26px",
                  padding: "13px",
                  paddingRight: "18px",
                }}
                className="w-full h-20 justify-start"
              >
                <div className="w-full min-w-max h-full as gap-2 text-2xl sm:text-3xl flex items-center justify-start">
                  <div className="bg-white grid place-items-center p-2 rounded-[6px] aspect-square h-[54px] w-[54px]">
                    <Image
                      alt={"Google Play"}
                      src={"/gplay.png"}
                      width={26}
                      height={26}
                    />
                  </div>
                  Android App
                </div>
              </Button>
            </a>
            <Button
              // variant=""
              size={"lg"}
              style={{
                fontSize: "26px",
                padding: "13px",
                paddingRight: "18px",
              }}
              disabled
              className="flex relative items-center justify-start h-20 w-full bg-gray-400 hover:bg-gray-400 cursor-not-allowed disabled:opacity-75"
            >
              <div
                className="absolute bg-[#2d2d2d] text-white text-lg px-2 py-1 rounded-lg right-0 top-0 translate-x-[15%] -translate-y-[40%]"
                style={{
                  animation: "pulse 2s infinite",
                }}
              >
                Under Development
              </div>

              <div className="w-[calc(100%-10px)] min-w-max text-2xl sm:text-3xl h-full as gap-2 flex items-center justify-start mx-[3px]">
                <div
                  className="w-[54px] h-[54px] grid place-items-center"
                  style={{
                    filter: "grayscale(0.75)",
                  }}
                >
                  <Image
                    alt={"App Store"}
                    src={"/astore.png"}
                    width={48}
                    height={48}
                  />
                </div>
                IOS App
              </div>
            </Button>
            {/* <span className="scroll-m-20 text-md font-extrabold tracking-tight">
              <Link className="text-blue-700 underline" href="/">
                Visit Our Website
              </Link>
            </span> */}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
