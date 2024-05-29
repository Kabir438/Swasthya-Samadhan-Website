import { Environment, PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { degreesToRadian } from ".";
import { Group, Object3DEventMap } from "three";

export default function Pellet({
    scene
}: {
    scene: Group<Object3DEventMap>
}) {
  return (
    <Canvas
      frameloop="demand"
      className="left-0 !w-48 !h-48"
      orthographic
      camera={{
        zoom: 30
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
        <Scene scene={scene} />
      </PresentationControls>
      <Environment preset="city" />
      <ambientLight intensity={1.5} position={[0, 0, 20]} />
    </Canvas>
  );
}

function Scene({
    scene
}: {
    scene: Group<Object3DEventMap>
}) {
  return (
    <group>
      <primitive scale={1.2} object={scene} />
    </group>
  );
}
