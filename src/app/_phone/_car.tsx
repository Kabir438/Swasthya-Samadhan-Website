import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGLTF, useScroll } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { MotionValue } from "framer-motion";
import { PrimitiveProps, useFrame } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export function Car({
  rotation,
}: {
  rotation: [MotionValue<number>, MotionValue<number>, MotionValue<number>];
}) {
  // const gltf = useLoader(GLTFLoader, "models/car/scene.gltf/models/phone/scene.gltf");
  // const gltf = useLoader(GLTFLoader, "/models/phone/scene.gltf");
  const { scene } = useGLTF("/models/phone/scene.gltf");
  const phoneRef = useRef<Group<Object3DEventMap>>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const scroll = useScroll();

  useFrame(() => {
    tl.current?.seek(scroll.offset * tl.current?.duration());
    console.log("called")
  });

  useEffect(() => {
    // if (!phoneRef.current) return;
    console.log("called")
    // tl.current = gsap.timeline();
    // tl.current.to(
    //   phoneRef.current?.rotation || [],
    //   {
    //     duration: 1,
    //     x: 1.5,
    //     z: 200,
    //   },
    //   0
    // );
  }, []);
  console.log("car component")
  return (
    null
    // <group ref={phoneRef}>
    //   <primitive object={scene} scale={0.75 * 2.2} position={[0, 0, 0]} />
    // </group>
  );
}

// useGLTF.preload("/models/phone/scene.gltf");
