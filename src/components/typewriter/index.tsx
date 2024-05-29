import { MutableRefObject, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useMediaQuery from "@/hooks/useMediaQuery";
import useMount from "@/hooks/useMount";

const phrases = [
  "Use the app in English!",
  "Use the app in English",
  "Use the app in English and Hindi!",
  "Use the app in English",
  "Use the app in English, Hindi, and Punjabi!",
  "Use the app in English, Hindi,",
  "Use the app in English, Hindi, Punjabi, and Gujarati!",
  "Use the app in English, Hindi, Punjabi,",
  "Use the app in English, Hindi, Punjabi, Gujarati, and Bangla!",
  "Use the app in English, Hindi, Punjabi, Gujarati,",
  "Use the app in English, Hindi, Punjabi, Gujarati, Bangla and Telugu!",
] as const;

const mobilePhrases = ["", phrases[phrases.length - 1]]

const generateTypewriterEffect = (phrases: Readonly<string[]>) => {
  const processedPhrases: string[] = [];

  phrases.forEach((phrase, index, arr) => {
    if (index > 0) {
      // Find the common starting substring for a smoother transition
      const previousPhrase = arr[index - 1];
      const minLength = Math.min(previousPhrase.length, phrase.length);
      let commonLength = 0;
      for (let i = 0; i < minLength; i++) {
        if (previousPhrase[i] !== phrase[i]) {
          break;
        }
        commonLength++;
      }

      // Repeat the previous phrase 12 times just before contracting
      if (previousPhrase.includes("!")) {
        for (let i = 0; i < 12; i++) {
          processedPhrases.push(previousPhrase);
        }
      }

      // Contract the previous phrase to the commonLength
      for (let i = previousPhrase.length; i > commonLength; i--) {
        processedPhrases.push(previousPhrase.substring(0, i - 1));
      }

      // Expand from the common point to the full current phrase
      for (let i = commonLength; i <= phrase.length; i++) {
        processedPhrases.push(phrase.substring(0, i));
      }
    } else {
      // Handle the first phrase separately
      for (let i = 0; i <= phrase.length; i++) {
        processedPhrases.push(phrase.substring(0, i));
      }
    }
  });

  console.log(processedPhrases);
  return processedPhrases;
};

const processedPhrases = generateTypewriterEffect(phrases);
const processedMobilePhrases = generateTypewriterEffect(mobilePhrases);

const Typewriter = () => {
  const complexAnimation = useMediaQuery("(max-width: 768px)");
  const [start, setStart] = useState(false);
  const started = useRef(false);
  const fired = useRef(false);
  const [index, setIndex] = useState(0);
  const typewriterRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let interval: null | NodeJS.Timeout = null;
    if (start && !started.current) {
      started.current = true;
      interval = setInterval(() => {
        setIndex((index) => {
          if (index === (complexAnimation ? processedMobilePhrases : processedPhrases).length - 1) {
            interval && clearInterval(interval);
            return index;
          }
          return index + 1;
        });
      }, 100);
    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [start, started]);

  const scroll = useScroll();

  useEffect(() => {
    const scrollBox =
      document.querySelector(".hi")?.parentElement?.parentElement;
    console.log(scrollBox);
    scrollBox?.addEventListener("scroll", () => {
      if (!typewriterRef.current) return;
      if (
        -(
          typewriterRef.current as Exclude<typeof typewriterRef.current, null>
        ).getBoundingClientRect().y +
          window.innerHeight >=
          300 &&
        !fired.current
      ) {
        // console.log("setstart");
        setStart(true);
        fired.current = true;
      }
    });
  }, [complexAnimation]);

  return (
    <h1
      id="typewriter"
      ref={typewriterRef}
      style={{
        fontSize: "41px",
        textAlign: "center",
        fontWeight: "600",
        lineHeight: "47px",
        overflow: "hidden",
        letterSpacing: "-0.3px",
      }}
      className="px-6 h-max sm:h-[196px]"
    >
      {(complexAnimation ? processedMobilePhrases : processedPhrases)[index]}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background: "linear-gradient(180deg, #ff9e9e -12%, #f7405e 73%)",
          verticalAlign: "baseline",
          height: "32px",
          top: "2px",
          position: "relative",
        }}
        className={cn(
          "inline-block rounded-[1px] w-[5px] ml-[5px] h-4 md:h-6 lg:h-10"
        )}
      ></motion.span>
    </h1>
  );
};

export default Typewriter;
