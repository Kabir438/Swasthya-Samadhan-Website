import { MutableRefObject, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  "Use the app in English, Hindi, Punjabi, Gujarati, Bangla, and Telugu!",
];
const generateTypewriterEffect = (phrases: string[]) => {
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

  return processedPhrases;
};

const processedPhrases = generateTypewriterEffect(phrases);

const Typewriter = ({
  start,
  started,
}: {
  start: boolean;
  started: MutableRefObject<boolean>;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: null | NodeJS.Timeout = null;
    if (start && !started.current) {
      started.current = true;
      console.log();
      interval = setInterval(() => {
        setIndex((index) => {
          if (index === processedPhrases.length - 1) {
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
  return (
    <h1
      id="typewriter"
      style={{
        fontSize: "41px",
        textAlign: "center",
        fontWeight: "600",
        lineHeight: "47px",
        overflow: "hidden",
        letterSpacing: "-0.3px",
        height: "144px",
      }}
      className="px-6"
    >
      {processedPhrases[index]}
      {/* <motion.span
        style={{
          width: "4px",
          height: "32px",
          display: "inline-block",
          background: "linear-gradient(180deg, #ff9e9e -12%, #f7405e 73%)",
          marginLeft: "2px",
          borderRadius: "1.4px",
          opacity: 1,
        }}
      ></motion.span> */}
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
