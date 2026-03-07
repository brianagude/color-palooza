"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { StrictMode, useState } from "react";
import { ryb2rgb } from "rybitten";
import { cubes } from "rybitten/cubes";
import * as THREE from "three";
// import Lights from "@/components/Lights";
import World from "@/components/World";

export default function Page() {

  const unsorted_options = {};
  cubes.forEach((cube, key) => {
    unsorted_options[cube.title] = key;
  });


  const sorted_options = {};

  Object.entries(unsorted_options)
    .map((entry, _) => ({ title: entry[0], key: entry[1] }))
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((item) => {
      sorted_options[item.title] = item.key;
    });

  const { preset, mode } = useControls({
    preset: {
      options: sorted_options,
      label: "Color Space",
    },
    mode: {
      value: "RYB",
      options: ["RYB", "RYB-In-RGB", "RGB"],
    }
  });

  const curr_cube = cubes.get(preset).cube;
  const bgColor = mode === "RYB" ? ryb2rgb([1, 1, 1], { cube: curr_cube }) : [1, 1, 1];
  const bgCSS = `rgb(${bgColor.map((c) => c * 255).join(",")})`;

  return (
    <main className="w-screen h-screen">
      <StrictMode>
        <Canvas
          shadows
          flat
          gl={{
            toneMapping: THREE.NoToneMapping,
            outputColorSpace: THREE.LinearSRGBColorSpace,
            antialias: false,
          }}
          camera={{
            position: [15, 15, 15],
          }}
          style={{ background: bgCSS }}
        >
          {/* <color args={bgColor} attach="background" /> */}
          {/* <Lights /> */}
          <World preset={preset} mode={mode} />
          <OrbitControls makeDefault />
        </Canvas>
      </StrictMode>
    </main>
  );
}
