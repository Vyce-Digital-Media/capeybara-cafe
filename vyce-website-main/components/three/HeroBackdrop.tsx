"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function DistortKnot() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.07;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.45}>
      <mesh ref={mesh} scale={1.05}>
        <torusKnotGeometry args={[1.12, 0.34, 96, 16]} />
        <MeshDistortMaterial
          color="#050a14"
          emissive="#0044ff"
          emissiveIntensity={0.38}
          roughness={0.28}
          metalness={0.88}
          distort={0.3}
          speed={1.05}
        />
      </mesh>
    </Float>
  );
}

export default function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.92]">
      <Canvas
        camera={{ position: [0, 0, 6.25], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[6, 8, 5]} intensity={1.15} />
        <pointLight position={[-6, -3, -2]} intensity={1.4} color="#0044ff" />
        <DistortKnot />
      </Canvas>
    </div>
  );
}
