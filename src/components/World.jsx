/** biome-ignore-all lint/a11y/noStaticElementInteractions: it's fine for meshes */

import { Instance, Instances } from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  const { boxSize, resolution } = useControls({
    boxSize: {
      value: { x: 0.5, y: 0.5, z: 0.5 },
      step: 0.01,
      max: 1,
      min: 0,
      joystick: "invertY",
    },
    resolution: {
      value: 10,
      step: 1,
      min: 1,
      max: 40,
      joystick: "invertY",
    },
  });
  

  const N = resolution;
  const cellsCount = N * N * N;

  const positions = [...Array(cellsCount)].map((_, i) => {
    const z = Math.floor(i / (N * N));
    const r = i % (N * N);
    const y = Math.floor(r / N);
    const x = r % N;

    return [x, y, z];
  });

  return (
    <Instances
      limit={64000} // Optional: max amount of items (for calculating buffer size)
      range={cellsCount} // Optional: draw-range
    >
      <boxGeometry args={[boxSize.x, boxSize.y, boxSize.z]} />
      <axesHelper args={[1]} />
      <meshLambertMaterial />
      {/* <meshStandardMaterial /> */}

      {(() => {

        return positions.map((position, i) => {
          const r = Math.floor((position[0] / N) * 255);
          const g = Math.floor((position[1] / N) * 255);
          const b = Math.floor((position[2] / N) * 255);
          const color = `rgb(${r},${g},${b})`;

          return <Instance key={i} position={position} color={color} />;
        });
      })()
      }
    </Instances>
  );
}
