"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
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
            position: [2, 2, 2],
          }}
        >
          <color args={[bgColor]} attach="background" />
          <Lights />
          <World />
          {/* <Suspense>
            <Physics debug>
              
            </Physics>
          </Suspense> */}
          <OrbitControls enabled={orbitContorls} makeDefault />
        </Canvas>
      </StrictMode>
    </main>
  );
}
