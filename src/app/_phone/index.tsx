"use client";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  OrbitControls,
  useGLTF,
  useHelper,
  useScroll,
} from "@react-three/drei";
import { MotionValue } from "framer-motion";
import { Camera, useFrame, useThree } from "@react-three/fiber";
import {
  CameraHelper,
  Group,
  Object3DEventMap,
  OrthographicCamera,
  PerspectiveCamera,
} from "three";
import gsap from "gsap";
import PresentationWrapper from "./_presentation";
import useMediaQuery from "@/hooks/useMediaQuery";

const getEndPercentage = (w: Window & typeof globalThis, d: Document) => {
  const totalHeight = w.innerHeight;
  const endScrollEl = d.querySelector(".end-scroll");
  if (!endScrollEl) return 0;
  const endScrollHeight =
    endScrollEl?.getBoundingClientRect().y +
    endScrollEl?.getBoundingClientRect().height;
  return endScrollHeight / totalHeight;
};

export default function Phone() {
  const { scene } = useGLTF("/models/phone/scene.gltf");
  const small = useMediaQuery("(max-width: 1090px)");
  const smaller = useMediaQuery("(max-width: 990px)");
  const complexAnimation = useMediaQuery("(max-width: 768px)");
  const shiftUp = useMediaQuery("(max-width: 704px)");
  const shrink = useMediaQuery("(max-width: 835px)");
  const shiftUpper = useMediaQuery("(max-width: 490px)");

  const scenePosition = useMemo(
    () =>
      shiftUpper
        ? [0, 0.38, 0]
        : ((shiftUp
            ? [-0.05, 0.23, 0]
            : complexAnimation
            ? [0, 0.2, 0]
            : [smaller ? 0.45 : 0.5, -0, 0]) as [number, number, number]),
    [smaller, complexAnimation, shiftUp, shiftUpper]
  );

  const sceneScale = useMemo(
    () => (shrink ? 0.17 : complexAnimation ? 0.15 : small ? 0.2 : 0.25),
    [shrink, complexAnimation, small]
  );

  const phoneRef = useRef<Group<Object3DEventMap>>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const scroll = useScroll();
  const { height } = useThree((t) => ({
    height: t.viewport.height,
    width: t.viewport.width,
  }));

  useFrame(() => {
    tl.current?.seek(scroll.range(0, complexAnimation ? 0.34 : 0.25) * tl.current?.duration());
    // console.log(scroll.offset);
    if (scroll.range(0, complexAnimation ? 0.37 : 0.25) === 1) {
      phoneRef.current?.position.setY((complexAnimation ? 0.9 : 0.6) * scroll.range(complexAnimation ? 0.37 : 0.25, 1) * height - 0.2 * (complexAnimation ? 1 : 0));
    } else if (!complexAnimation && scroll.range(0, complexAnimation ? 0.37 : 0.25) < 1) {
      console.log(complexAnimation)
      phoneRef.current?.position.setY(0);
    }

    const footer = document.getElementById("actual-footer");
    if (!footer) return;
    // console.log("footer", footer)
    const showFooter =
      (document.getElementById("mask-footer")?.getBoundingClientRect().y ||
        -Infinity) < window.innerHeight;
    footer.style.opacity = showFooter ? "1" : "0";
  });

  useEffect(() => {
    // if (!phoneRef.current) return;
    console.log("called", complexAnimation);

    tl.current = gsap.timeline();

    if (!complexAnimation) {
      tl.current.fromTo(
        // degreesToRadian([-33, -27, -24])
        phoneRef.current?.rotation || [],
        {
          duration: 2,
          x: -23 * (Math.PI / 180),
          y: -29 * (Math.PI / 180),
          z: -12 * (Math.PI / 180),
        },
        {
          duration: 2,
          x: 0,
          z: 0,
          y: 0,
        },
        0
      );
    } else {
      tl.current
        .fromTo(
          // degreesToRadian([-33, -27, -24])
          phoneRef.current?.rotation || [],
          {
            duration: 0.5,
            x: -23 * (Math.PI / 180),
            y: -29 * (Math.PI / 180),
            z: -12 * (Math.PI / 180),
          },
          {
            duration: 0.75,
            x: 0,
            z: 0,
            y: 0,
          },
          0
        )
        .fromTo(
          // degreesToRadian([-33, -27, -24])
          phoneRef.current?.position || [],
          {
            duration: 0.5,
            x: -0.05,
            y: 0,
            z: 0,
          },
          {
            duration: 0.75,
            x: 0.8,
            z: 0,
            y: 0,
          },
          0
        )
        .fromTo(
          // degreesToRadian([-33, -27, -24])
          phoneRef.current?.scale || [],
          {
            duration: 0.25,
            x: 0.9,
            y: 0.9,
            z: 0.9,
          },
          {
            duration: 0.25,
            x: 0.5,
            z: 0.5,
            y: 0.5,
          },
          0
        )
        .fromTo(
          // degreesToRadian([-33, -27, -24])
          phoneRef.current?.position || [],
          {
            duration: 0.5,
            x: 0.8,
            z: 0,
            y: 0,
          },
          {
            duration: 0.5,
            x: 0,
            z: 0,
            y: -0.2,
          },
          0.7
        ).fromTo(
          // degreesToRadian([-33, -27, -24])
          phoneRef.current?.scale || [],
          {
            duration: 0.35,
            x: 0.5,
            z: 0.5,
            y: 0.5,
          },
          {
            duration: 0.35,
            x: 1.1,
            z: 1.1,
            y: 1.1,
          },
          0.7
        );
    }
    // .to(
    //   phoneRef.current?.position || [],
    //   {
    //     duration: 1,
    //     x: 0.2,
    //   },
    //   0
    // )
    // .to(
    //   phoneRef.current?.position || [],
    //   {
    //     duration: 1,
    //     x: 0,
    //   },
    //   1
    // );
  }, [complexAnimation]);
  return (
    <>
      <group ref={phoneRef}>
        <primitive object={scene} scale={sceneScale} position={scenePosition} />
      </group>
      <pointLight intensity={1} position={[10, -20, 15]} />
    </>
  );
}

export function degreesToRadian(input: number): number;
export function degreesToRadian(input: number[]): number[];
export function degreesToRadian(input: number | number[]): number | number[] {
  if (typeof input === "number") {
    return input * (Math.PI / 180);
  } else if (Array.isArray(input)) {
    return input.map((v) => v * (Math.PI / 180));
  } else {
    throw new TypeError("Input must be a number or an array of numbers");
  }
}

useGLTF.preload("/models/phone/scene.gltf");
