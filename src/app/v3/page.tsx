"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Leva, useControls } from "leva";
import { StrictMode, Suspense } from "react";
// import Lights from "@/components/v3/Lights";
import World from "@/components/v3/World";

export default function Page() {
  const { bgColor } = useControls({
    bgColor: "#050505",
  });

  return (
    <main className="w-screen h-screen">
      <Leva collapsed />
      <StrictMode>
        <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>
          <color attach="background" args={[bgColor]} />
          <Suspense>
            <Physics debug>
              <World />
            </Physics>
          </Suspense>
          <OrbitControls/>
        </Canvas>
      </StrictMode>
    </main>
  );
}