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
  const [background, setBackground] = useState([0, 0, 0]);

  const options = {};
  cubes.forEach((cube, key) => {
    options[cube.title] = key;
  });

  const { preset } = useControls({
    preset: {
      options: options,
      label: "Color Space",
      onChange: (value) => {
        const curr_cube = cubes.get(value).cube;
        setBackground(ryb2rgb([1,1,1], { cube: curr_cube }));

        console.log("preset", value);
        console.log("curr_cube", curr_cube);
        console.log("bgColor", background);
        console.log(ryb2rgb([1,1,1], { cube: curr_cube }))
      }
    },
  });

  // const curr_cube = cubes.get(preset).cube;
  // const bgColor = ryb2rgb([1, 1, 1], { cube: curr_cube });
  // setBackground(ryb2rgb([1, 1, 1], { cube: curr_cube }));

  // function changeColor(color) {
  //   const curr_cube = cubes.get(preset).cube;
  //   setBackground(ryb2rgb(color, { cube: curr_cube }));
  // }


//   const values = useControls({
//   color: {
//     value: '#f00',
//     onChange: (value) => {
//       console.log('Color changed:', value)
//     },
//   },
// })

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
        >
          <color args={background} attach="background" />
          {/* <Lights /> */}
          <World />
          <OrbitControls makeDefault />
        </Canvas>
      </StrictMode>
    </main>
  );
}
