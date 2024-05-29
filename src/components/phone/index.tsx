"use client";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

const springConfig = {
  mass: 0.0001,
  stiffness: 100,
  damping: 2,
  // restDelta: 2,
};
export function useSmooth<T>(source: MotionValue<T>): MotionValue<T> {
  return useSpring(source, springConfig);
  return source;
}

export const scale = 1;
export const width = 357.5 * scale;
export const height = 733.5 * scale;
export const outerBorderRadius = 47.33 * scale;
export const metalicBezelWidth = 3 * scale;
export const blackBezelWidth = 10 * scale;
export const notchHeight = 32 * scale;
export const notchWidth = 112 * scale;
export const notchRadius = 13 * scale;
export const notchOutDimension = 10 * scale;
export const notchOutRadius = 4 * scale;
export const notchShadowX = 3 * scale;
export const notchShadowY = 4 * scale;

// const createFunc = (initial: number, final: number) => (x: number) =>
//   (final - initial) * x + initial;

export default function Phone({
  children,
  scrollYProgress,
}: {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
}) {
  const rotateX = useSmooth(useTransform(scrollYProgress, [0, 1], [42, 0]));
  const rotateY = useSmooth(useTransform(scrollYProgress, [0, 1], [-26, 0]));
  const rotateZ = useSmooth(useTransform(scrollYProgress, [0, 1], [25, 0]));
  const translateX = useMotionTemplate`calc(calc(48px + 6vw - 9vw) * ${scrollYProgress})`;
  const translateY = useMotionTemplate`calc(${scrollYProgress} * calc(200vh - 100% - 64px))`;

  const phoneShadow3D = useMotionValue("");
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const newShadow = Array(14 * 2)
      .fill(null)
      .map(
        (_, i) =>
          `${0.5 * (i + 1) * (1 - value)}px ${
            (1 - value) * 0.8 * 0.5 * (i + 1)
          }px 0px 0px #ccc8c0`
      )
      .join(", ");
    phoneShadow3D.set(newShadow);
  });
  // rotateY(34deg) rotateZ(1deg) translate3d(16px, 162px, 1px) skew(1deg, 1deg)
  // final = rotateY(-91deg) rotateZ(0deg) translate3d(13px, 159px, -7px) skew(0deg, 0deg)
  const powerButtonRotateY = useSmooth(
    useTransform(scrollYProgress, [0, 1], [34, -91])
  );
  const powerButtonRotateZ = useSmooth(
    useTransform(scrollYProgress, [0, 1], [1, 3])
  );
  const powerButton3DX = useSmooth(
    useTransform(scrollYProgress, [0, 1], [16, 13])
  );
  const powerButton3DY = useSmooth(
    useTransform(scrollYProgress, [0, 1], [162, 159])
  );
  const powerButton3DZ = useSmooth(
    useTransform(scrollYProgress, [0, 1], [1, -7])
  );
  const powerButtonSkewX = useSmooth(
    useTransform(scrollYProgress, [0, 1], [1, 0])
  );
  const powerButtonSkewY = useSmooth(
    useTransform(scrollYProgress, [0, 1], [1, 0])
  );
  const powerButtonTransform = useMotionTemplate`rotateY(${powerButtonRotateY}deg) rotateZ(${powerButtonRotateZ}deg) translate3d(${powerButton3DX}px, ${powerButton3DY}px, ${powerButton3DZ}px) skew(${powerButtonSkewX}deg, ${powerButtonSkewY}deg)`;
  // const initialPowerButtonTransform = useMemo(() => (`rotateY(${33}deg) rotateZ(${1}deg) translate3d(${1}px, ${-162}px, ${1}px) skew(${1}deg, ${1}deg)`), [])
  return (
    <motion.div
      // className="bg-red-400"
      style={{
        position: "relative",
        boxSizing: "content-box",
        padding: "0px 0%",
        marginRight: "6vw",
        zIndex: 10,
        height: "calc(100vh - 64px)",
        rotateX,
        rotateY,
        rotateZ,
        marginTop: translateY,
        marginLeft: translateX,
      }}
      initial={{
        rotateX: 42,
        rotateY: -26,
        rotateZ: 25,
      }}
      layout
    >
      <motion.div
        className="absolute right-1/2 z-[2] grid place-items-center"
        initial={{
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
          // translateX: 0,
          boxShadow: Array(14 * 2)
            .fill(null)
            .map(
              (_, i) =>
                `${0.5 * (i + 1)}px ${0.8 * 0.5 * (i + 1)}px 0px 0px #ccc8c0`
            )
            .join(", "),
        }}
        style={{
          translateY,
          translateX,
          // translateX: translateXInner,
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: `${outerBorderRadius}px`,
          background: "#ccc8c0",
          boxShadow: phoneShadow3D,
        }}
      >
        <motion.div
          className="power-3d w-[2px] h-20 bg-[#ccc8c0] absolute right-0 translate-x-[100%] translate-y-[200%] top-0"
          style={{
            width: "13px",
            background: "#ccc8c0",
            transform: powerButtonTransform,
            borderRadius: "15px",
            zIndex: "4",
          }}
          initial={{
            boxShadow: "-0.25px -0.25px 0px 0.5px #2b0000",
            // transform: initialPowerButtonTransform
          }}
        />
        <div className="power w-[2px] h-20 bg-[#ccc8c0] absolute right-0 translate-x-[100%] translate-y-[200%] top-0" />
        <div className="silent w-[2px] h-4 bg-[#ccc8c0] absolute left-0 translate-x-[-100%] top-[12%]" />
        <div className="volume-up w-[2px] h-12 bg-[#ccc8c0] absolute left-0 translate-x-[-100%] top-[18%]" />
        <div className="volume-up w-[2px] h-12 bg-[#ccc8c0] absolute left-0 translate-x-[-100%] top-[27%]" />
        <div
          className="depth absolute scale-y-150"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        ></div>
        <div
          style={{
            width: `calc(100% - ${metalicBezelWidth * 2}px)`,
            height: `calc(100% - ${metalicBezelWidth * 2}px)`,
            borderRadius: `${outerBorderRadius - metalicBezelWidth}px`, // cant figure out
            background: "black",
          }}
          className="grid place-items-center relative"
        >
          <div
            className="notch z-[1] bg-transparent absolute left-[50%] top-0 -translate-x-[50%]"
            style={{
              width: `${notchWidth}px`,
              height: `${notchHeight}px`,
              borderBottomLeftRadius: `${notchRadius}px`,
              borderBottomRightRadius: `${notchRadius}px`,
            }}
          >
            <div
              style={{
                position: "absolute",
                zIndex: "10",
                width: `${notchOutDimension}px`,
                height: `${notchOutDimension}px`,
                left: "0px",
                top: "0px",
                borderBottomLeftRadius: `${notchOutRadius}px`,
                boxShadow: `${-notchShadowX}px ${notchShadowY}px 0px black`,
                background: "transparent",
                transform: "rotateZ(180deg) translateX(100%) translateY(-100%)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                zIndex: "10",
                width: `${notchOutDimension}px`,
                height: `${notchOutDimension}px`,
                top: "0px",
                boxShadow: `${notchShadowX}px ${notchShadowY}px 0px black`,
                background: "#00000000",
                borderBottomRightRadius: `${notchOutRadius}px`,
                right: "0",
                transform:
                  "rotateZ(180deg) translateX(-100%) translateY(-100%)",
              }}
            ></div>
          </div>
          <div
            style={{
              width: `calc(100% - ${blackBezelWidth * 2}px)`,
              height: `calc(100% - ${blackBezelWidth * 2}px)`,
              borderRadius: `${
                outerBorderRadius - metalicBezelWidth - blackBezelWidth
              }px`, // cant figure out
              position: "relative",
              // overflow: "hidden"
            }}
          >
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
