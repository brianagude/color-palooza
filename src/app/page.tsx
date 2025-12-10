"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import Link from "next/link";
import { Perf } from "r3f-perf";
import { StrictMode, Suspense } from "react";
import Lights from "@/components/Lights";
import World from "@/components/World";

export default function Page() {
  const { bgColor, orbitContorls } = useControls({
    bgColor: "#000000",
    orbitContorls: true,
  });

  return (
    <main className="w-screen h-screen">
      <StrictMode>
        {/* <Leva theme={levaTheme} /> */}
        <Canvas
          shadows
          camera={{
            position: [0, 10, 10],
          }}
        >
          <color args={[bgColor]} attach="background" />
          <Perf position="top-left" />
          <Lights />
          <Suspense>
            <Physics debug>
              <World />
            </Physics>
          </Suspense>
          <OrbitControls enabled={orbitContorls} makeDefault />
        </Canvas>
      </StrictMode>
      <Link href="/" className="fixed z-10 bottom-4 right-4 underline text-white hover:opacity-50">Home</Link>
    </main>
  );
}
