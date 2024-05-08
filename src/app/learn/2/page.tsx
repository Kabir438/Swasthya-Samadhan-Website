"use client"
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

function App() {
  const vertices = new Float32Array([
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    // Back face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
    -1.0,  1.0, -1.0
  ]);

  const indices = new Uint16Array([
    0, 1, 2,   0, 2, 3,    // front
    4, 5, 6,   4, 6, 7,    // back
    5, 1, 2,   5, 2, 6,    // top
    4, 0, 3,   4, 3, 7,    // bottom
    4, 5, 1,   4, 1, 0,    // left
    3, 2, 6,   3, 6, 7     // right
  ]);

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} />
      <mesh geometry={geometry}>
        <meshStandardMaterial color={'hotpink'} />
      </mesh>
    </Canvas>
  );
}

export default App;
