"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Lattice() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.06;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.65, 0]} />
        <meshBasicMaterial color="#0044ff" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh scale={1.22}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <octahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial
          color="#0b1224"
          emissive="#0044ff"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.35}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function LatticeField() {
  return (
    <div className="h-[min(52vh,520px)] w-full md:h-[min(60vh,600px)]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 8]} intensity={0.8} />
        <Lattice />
      </Canvas>
    </div>
  );
}
