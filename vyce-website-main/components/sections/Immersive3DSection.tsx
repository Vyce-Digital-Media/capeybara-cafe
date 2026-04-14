"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleSwarm({ count = 5000 }) {
  const points = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.set([x, y, z], i * 3);
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.x = state.clock.elapsedTime * 0.05;
    points.current.rotation.y = state.clock.elapsedTime * 0.03;
    
    // Wave effect
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      positions[i * 3 + 1] = Math.sin(state.clock.elapsedTime + x + z) * 0.2;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={points} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0044ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function Immersive3DSection() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black py-32">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-black to-background opacity-80" />
      
      <div className="absolute inset-0 z-10 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleSwarm />
        </Canvas>
      </div>

      <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl space-y-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-primary">Spatial Intelligence</p>
          <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
            Atmospheric <br />
            <span className="font-satoshi font-normal lowercase italic text-primary/80">interfaces</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/40 md:text-lg">
            We don't just build sites; we architect virtual spaces. Using high-performance WebGL, 
            we create tactile dimensions that respond to your intent.
          </p>
        </div>

        <div className="mt-20 flex items-center gap-12 text-xs font-bold uppercase tracking-[0.4em] text-white/20">
          <span className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" /> GLSL Shaders
          </span>
          <span className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" /> R3F Pipeline
          </span>
          <span className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" /> Procedural Geometry
          </span>
        </div>
      </div>
    </section>
  );
}
