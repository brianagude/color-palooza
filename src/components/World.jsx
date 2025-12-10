/** biome-ignore-all lint/a11y/noStaticElementInteractions: it's fine for meshes */
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from 'three'

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const torusRef = useRef();
  const pillRef = useRef();

  const INTRO_START = new THREE.Vector3(20, 20, 0)
  const INTRO_DURATION = 2

  useFrame((state, delta) => {
    // state: info about the Three.js environment
    // delta: time spent since the last frame in seconds

    const elapsedTime = state.clock.getElapsedTime()
    const t = Math.min(elapsedTime / INTRO_DURATION, 1)
    
    const pillPos = pillRef.current.translation()
    
    const target = new THREE.Vector3(
      pillPos.x - 5,
      pillPos.y + 5,
      pillPos.z + 5
    )

    if (t < 1) {
      // Intro: lerp from start to target
      state.camera.position.lerpVectors(INTRO_START, target, t)
    } else {
      // Following: smoothly lerp toward moving target
      state.camera.position.lerp(target, 0.1) // ← Different lerp!
    }
    
    state.camera.lookAt(pillPos.x, pillPos.y, pillPos.z) // ← Always look at pill

    cubeRef.current.rotation.y += delta;
    sphereRef.current.rotation.x += delta;
    sphereRef.current.rotation.y += delta;
    torusRef.current.rotation.y += delta * 0.2;
  });

  const pillJump = () => {
    console.log(pillRef.current)
    pillRef.current.applyImpulse({ x: 0, y: 100, z: 0 }, true);
    pillRef.current.applyTorqueImpulse({
      x: 0,
      y: Math.random() * 100 - 50,
      z: 0,
    });
  };

  const {
    boxPosition,
    spherePosition,
    torusPosition,
    floorPositionY,
    floorSize,
  } = useControls({
    boxPosition: {
      value: { x: -4, y: 5, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    spherePosition: {
      value: { x: 0, y: 5, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    torusPosition: {
      value: { x: 4, y: 5, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    floorSize: {
      value: { w: 20, h: 0.5, d: 20 },
      step: 0.01,
    },
    floorPositionY: {
      value: -0.25,
      step: 0.01,
      min: -5,
      max: 0,
    },
  });

  return (
    <>
      <RigidBody
        ref={pillRef}
        colliders="hull"
        position={[-4, 3, 2]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <mesh castShadow receiveShadow onClick={pillJump}>
          <capsuleGeometry args={[1, 3]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        position={[0, 3, 1]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <mesh castShadow receiveShadow onClick={pillJump}>
          <capsuleGeometry args={[1, 3]} />
          <meshStandardMaterial color="purple" />
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        position={[4, 3, 4]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <mesh castShadow receiveShadow onClick={pillJump}>
          <capsuleGeometry args={[1, 3]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>

      <mesh
        ref={cubeRef}
        position={[boxPosition.x, boxPosition.y, boxPosition.z]}
        receiveShadow
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial color="lightgreen" />
      </mesh>

      <mesh
        ref={sphereRef}
        position={[spherePosition.x, spherePosition.y, spherePosition.z]}
        receiveShadow
        castShadow
      >
        <icosahedronGeometry />
        <meshStandardMaterial color="pink" />
      </mesh>
      
      <mesh
        ref={torusRef}
        position={[torusPosition.x, torusPosition.y, torusPosition.z]}
        receiveShadow
        castShadow
      >
        <torusGeometry />
        <meshStandardMaterial color="lightblue" />
      </mesh>

      {/* Floor */}
      <RigidBody type="fixed" position-y={floorPositionY} restitution={1}>
        <mesh receiveShadow>
          <boxGeometry args={[floorSize.w, floorSize.h, floorSize.d]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </RigidBody>

      {/* Walls */}
      <RigidBody type="fixed">
        <CuboidCollider args={[10, 5, 0.25]} position={[0, 5, -10]} />
        <CuboidCollider args={[10, 5, 0.25]} position={[0, 5, 10]} />
        <CuboidCollider args={[10, 5, 0.25]} position={[-10, 5, 0]} rotation={[0, Math.PI/2, 0]} />
        <CuboidCollider args={[10, 5, 0.25]} position={[10, 5, 0]} rotation={[0, Math.PI/2, 0]} />
      </RigidBody>
    </>
  );
}
