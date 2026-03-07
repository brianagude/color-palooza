/** biome-ignore-all lint/a11y/noStaticElementInteractions: it's fine for meshes */

import { Instance, Instances } from "@react-three/drei";
import { useControls } from "leva";
import { ryb2rgb } from 'rybitten';
import { cubes } from "rybitten/cubes";

export default function World(args) {
  const { boxSize, resolution, mode } = useControls({
    boxSize: {
      value: { x: 0.5, y: 0.5, z: 0.5 },
      step: 0.01,
      max: 1,
      min: 0,
      joystick: "invertY",
    },
    resolution: {
      value: 20,
      step: 1,
      min: 10,
      max: 25,
      joystick: "invertY",
    },
  });
  
  
  const curr_cube = cubes.get(args.preset).cube;

  const N = resolution;
  const cellsCount = N * N * N;

  const landmarks = curr_cube.map(c => c.map(v => Math.round(v * (N - 1)) - (N-1)/2));
  console.log(landmarks);

  /* From Google */
  const equalArrays = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every((element, index) => {
      return element === arr2[index];
    });
  };


  const positions = [...Array(cellsCount)].map((_, i) => {
    const z = Math.floor(i / (N * N)) - (N-1)/2;
    const r = i % (N * N);
    const y = Math.floor(r / N) - (N-1)/2;
    const x = r % N - (N-1)/2;

    return [x, y, z];
  });

  return (
    <Instances
      limit={64000} // Optional: max amount of items (for calculating buffer size)
      range={cellsCount} // Optional: draw-range
    >
      {/* <axesHelper args={[1]} /> */}
      <meshBasicMaterial />
      <boxGeometry args={[boxSize.x, boxSize.y, boxSize.z]} />
      {/* <meshLambertMaterial /> */}
      {/* <meshStandardMaterial /> */}

      {(() => {

        return positions.map((position, i) => {
          const isLandmark = landmarks.some(l => {
            console.log(l, position);
            return equalArrays(l, position);
          });

          const c1 = (position[0] + (N-1)/2) / (N-1);
          const c2 = (position[1] + (N-1)/2) / (N-1);
          const c3 = (position[2] + (N-1)/2) / (N-1);
          const ryb = ryb2rgb([c1, c2, c3], { cube: curr_cube });

          const r = args.mode === "RYB" ? ryb[0] : c1;
          const g = args.mode === "RYB" ? ryb[1] : c2;
          const b = args.mode === "RYB" ? ryb[2] : c3;
          const color = [r,g,b];

          if (isLandmark && args.mode === "RGB") {
            return <Instance key={i} position={position} color={color} scale={2} />;
          }

          return <Instance key={i} position={position} color={color} scale={args.mode === "RGB" ? 0.2 : 1} />;
        });
      })()
      }
    </Instances>
  );
}
