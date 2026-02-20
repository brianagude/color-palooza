/** biome-ignore-all lint/a11y/noStaticElementInteractions: it's fine for meshes */

import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cubeRef = useRef();

  // const INTRO_START = new THREE.Vector3(20, 20, 0)
  // const INTRO_DURATION = 2

  useFrame((state, delta) => {
    // const elapsedTime = state.clock.getElapsedTime()
    // const t = Math.min(elapsedTime / INTRO_DURATION, 1)
    // const pillPos = pillRef.current.translation()
    // const target = new THREE.Vector3(
    //   pillPos.x - 5,
    //   pillPos.y + 5,
    //   pillPos.z + 5
    // )
    //   if (t < 1) {
    //     state.camera.position.lerpVectors(INTRO_START, target, t)
    //   } else {
    //     state.camera.position.lerp(target, 0.1)
    //   }
    //   state.camera.lookAt(pillPos.x, pillPos.y, pillPos.z)
    //   cubeRef.current.rotation.y += delta;
    //   sphereRef.current.rotation.x += delta;
    //   sphereRef.current.rotation.y += delta;
    //   torusRef.current.rotation.y += delta * 0.2;
  });
  const N = 10;
  const cellsCount = N * N * N;

  // // const cells = useMemo(() => {
  // //   const instances = [];
  // //   for (let i = 0; i < cellsCount; i++) {
  // //     instances.push({
  // //       key: `instance_${i}`,
  // //       position: [
  // //         (Math.random() - 0.5) * 4,
  // //         6 + i * 0.2,
  // //         (Math.random() - 0.5) * 4,
  // //       ]
  // //     });
  // //   }
  // //   return instances;
  // // }, [cellsCount]);

  // const cells = new Array(cellsCount);
  // for (let i = 0; i < cells.length; i++) {
  //   cells.push({
  //     key: `instance_${i}`,
  //     position: [
  //       (Math.random() - 0.5) * 4,
  //       6 + i * 0.2,
  //       (Math.random() - 0.5) * 4,
  //     ]
  //   });
  // }

  const positions = [...Array(cellsCount)].map((_, i) => {
    const z = Math.floor(i / (N*N));
    const r = i % (N*N);
    const y = Math.floor(r / N);
    const x = r % N;

    return [x,y,z];
  }
  );

  const { boxPosition } = useControls({
    boxPosition: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
  });

  return (
    <>
      <Instances
        limit={1000} // Optional: max amount of items (for calculating buffer size)
        range={1000} // Optional: draw-range
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        {/* <boxGeometry /> */}
        <axesHelper args={[1]} />
        <meshStandardMaterial color="lightblue" />

        {positions.map((position, i) => (
          <Instance key={i} position={position} />
        ))}
      </Instances>

      {/* <mesh
        ref={cubeRef}
        position={[boxPosition.x, boxPosition.y, boxPosition.z]}
        receiveShadow
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial color="lightgreen" />
      </mesh> */}

      {/* <instancedMesh
        castShadow
        receiveShadow
        args={[null, null, cellsCount]}
        ref={cubeRef}
      >
        <boxGeometry />
        <meshStandardMaterial color="lightblue" />
      </instancedMesh> */}
    </>
  );
}
