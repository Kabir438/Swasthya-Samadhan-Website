"use client";
import { Environment, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { degreesToRadian } from ".";
import { Group, Object3DEventMap } from "three";
import { useGLTF } from "@react-three/drei";

export default function FullPellet() {
  return (
    <Canvas
      frameloop="demand"
      className="left-0 !w-48 !h-48"
      orthographic
      camera={{
        zoom: 30,
      }}
    >
      {/* <color attach="background" args={["#0000000"]} /> */}
      <PresentationControls
        // global
        cursor
        snap={{ mass: 1, tension: 170 }}
        speed={2}
        // rotation={[0, 0.3, 0]}
        config={{ mass: 1, tension: 170, friction: 26 }}
        polar={degreesToRadian([-45, 45]) as [number, number]}
        azimuth={degreesToRadian([-45, 45]) as [number, number]}
      >
        <Scene />
      </PresentationControls>
      <Environment preset="city" />
      <ambientLight intensity={1.5} position={[0, 0, 20]} />
    </Canvas>
  );
}
function Scene() {
  const { scene } = useGLTF("/models/pellet/pellet.gltf");
  return (
    <group>
      <primitive scale={1.2} object={scene} />
    </group>
  );
}

useGLTF.preload("/models/pellet/pellet.gltf");
