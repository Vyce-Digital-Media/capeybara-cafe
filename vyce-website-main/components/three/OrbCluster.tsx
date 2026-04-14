"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const positions: [number, number, number][] = [
  [-1.35, 0.35, 0.2],
  [1.15, -0.25, 0.35],
  [0.15, 1.05, -0.45],
  [-0.45, -0.95, 0.5],
];

function Orbs() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.045;
  });

  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <Float key={i} speed={1.4 + i * 0.15} floatIntensity={0.35} rotationIntensity={0.2}>
          <mesh position={p}>
            <sphereGeometry args={[0.42, 28, 28]} />
            <meshPhysicalMaterial
              color={i % 2 === 0 ? "#0044ff" : "#1a2744"}
              metalness={0.95}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.2}
              emissive="#0044ff"
              emissiveIntensity={0.12}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function OrbCluster() {
  return (
    <div className="h-[min(48vh,480px)] w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.2} />
        <spotLight position={[6, 8, 4]} angle={0.35} penumbra={1} intensity={1.2} />
        <pointLight position={[-5, -2, 2]} intensity={0.8} color="#0044ff" />
        <Orbs />
      </Canvas>
    </div>
  );
}
