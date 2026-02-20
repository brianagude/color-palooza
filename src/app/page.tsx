"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { StrictMode } from "react";
import Lights from "@/components/Lights";
import World from "@/components/World";

export default function Page() {
  const { bgColor } = useControls({
    bgColor: "#000000",
  });

  return (
    <main className="w-screen h-screen">
      <StrictMode>
        <Canvas
          shadows
          camera={{
            position: [15, 15, 15],
          }}
        >
          <color args={[bgColor]} attach="background" />
          <Lights />
          <World />
          <OrbitControls makeDefault />
        </Canvas>
      </StrictMode>
    </main>
  );
}
