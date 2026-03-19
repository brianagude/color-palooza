/** biome-ignore-all lint/a11y/noStaticElementInteractions: it's fine for meshes */

import { Instance, Instances } from "@react-three/drei";
import { useControls } from "leva";
import { ryb2rgb } from "rybitten";
import { cubes } from "rybitten/cubes";
import * as THREE from "three";

export default function World(args) {
  const { boxSize, resolution } = useControls({
    boxSize: {
      value: 10,
      step: 0.5,
      max: 10,
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

  const wallSize = 256;
  const cellsCount = 8;

  const landmarks = curr_cube.map((c) => {
    const position = c.map((v) => (v - 0.5) * wallSize);
    return { position, color: c };
  });

  
  const half = wallSize / 2;
  const wallOpacity = 0.1;

  return (
    <>
      <Instances limit={64000} range={cellsCount}>
        <meshBasicMaterial />
        <sphereGeometry args={[boxSize]} />

        {(() => {
          return landmarks.map((landmark, i) => {
            return (
              <Instance
                key={i}
                position={landmark.position}
                color={landmark.color}
                scale={2}
              />
            );
          });
        })()}
      </Instances>

      {/* Visual walls */}
      {/* Back wall */}
      <mesh position={[0, 0, -half]} rotation-y={Math.PI}>
        <planeGeometry args={[wallSize, wallSize]} />
        <meshStandardMaterial
          transparent
          opacity={wallOpacity}
          side={THREE.BackSide}
          depthWrite={false}
          roughness={0.05}
          metalness={0}
          color="white"
        />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, 0, half]}>
        <planeGeometry args={[wallSize, wallSize]} />
        <meshStandardMaterial
          transparent
          opacity={wallOpacity}
          side={THREE.BackSide}
          depthWrite={false}
          roughness={0.05}
          metalness={0}
          color="white"
        />
      </mesh>

      {/* Left wall */}
      <mesh position={[-half, 0, 0]} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[wallSize, wallSize]} />
        <meshStandardMaterial
          transparent
          opacity={wallOpacity}
          side={THREE.BackSide}
          depthWrite={false}
          roughness={0.05}
          metalness={0}
          color="white"
        />
      </mesh>

      {/* Right wall */}
      <mesh position={[half, 0, 0]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[wallSize, wallSize]} />
        <meshStandardMaterial
          transparent
          opacity={wallOpacity}
          side={THREE.BackSide}
          depthWrite={false}
          roughness={0.05}
          metalness={0}
          color="white"
        />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -half, 0]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[wallSize, wallSize]} />
        <meshStandardMaterial
          transparent
          opacity={wallOpacity}
          side={THREE.BackSide}
          depthWrite={false}
          roughness={0.05}
          metalness={0}
          color="white"
        />
      </mesh>

      {/* Top */}
      <mesh position={[0, half, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[wallSize, wallSize]} />
        <meshStandardMaterial
          transparent
          opacity={wallOpacity}
          side={THREE.BackSide}
          depthWrite={false}
          roughness={0.05}
          metalness={0}
          color="white"
        />
      </mesh>
    </>
  );
}
