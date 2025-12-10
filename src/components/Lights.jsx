import { Helper } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

export default function Lights() {
  const light = useRef();

  const {
    ambientLightIntensity,
    directionalLightIntensity,
    directionalLightPosition,
  } = useControls({
    ambientLightIntensity: {
      value: 1,
      step: 0.001,
      min: 0,
      max: 3,
      label: "Ambient Intensity",
    },
    directionalLightIntensity: {
      value: 1,
      step: 0.001,
      min: 0,
      max: 3,
      label: "Directional Intensity",
    },
    directionalLightPosition: {
      value: { x: 0, y: 7, z: 5 },
      step: 0.01,
      joystick: "invertY",
      label: "Directional Position",
    },
  });
  return (
    <>
      <ambientLight intensity={ambientLightIntensity} />

      <directionalLight
        intensity={directionalLightIntensity}
        castShadow
        ref={light}
        position={[
          directionalLightPosition.x,
          directionalLightPosition.y,
          directionalLightPosition.z,
        ]}
        color="white"
      >
        <Helper type={DirectionalLightHelper} />
      </directionalLight>
    </>
  );
}
