import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { TextureLoader, RepeatWrapping } from "three"

export function Ground() {

  const [roughness, normal] = useLoader(TextureLoader, [
    `http://localhost:3000/` + 'textures/terrain-roughness.jpg',
    `http://localhost:3000/` + 'textures/terrain-normal.jpg',
  ])

  useEffect(() => {
    [roughness, normal].map(t => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5)
    })
  })
  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        mirror={0}
        envMapIntensity={0}
        dithering={true}
        color={[0.15, 0.15, 0.15]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        normalMap={normal}
        // @ts-ignore
        normalScale={[0.15, 0.15]}
        roughnessMap={roughness}
        // debug={0}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}
