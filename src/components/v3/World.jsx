import { shaderMaterial, useVideoTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Create the shader material
const CameraShaderMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uAudioVolume: 0,
    uIntensity: 0.5,
    uThreshold: 0.1,
    uNoiseScale: 1.0,
  },

  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,

  // Fragment Shader
  `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uAudioVolume;
  uniform float uIntensity;
  uniform float uThreshold;
  uniform float uNoiseScale;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv; 

    float glitchStrength = uAudioVolume * uIntensity;

    vec2 shakyUv = uv;
    shakyUv.x += (random(vec2(uv.y * uNoiseScale, uTime)) - 0.5) * glitchStrength;

    vec4 finalColor = texture2D(uTexture, shakyUv);

    gl_FragColor = finalColor;
  }
  `
);

extend({ CameraShaderMaterial });

export default function Experience() {
  const [stream, setStream] = useState(null);

  const { intensity, threshold, noiseScale } = useControls({
    intensity: { value: 0.5, min: 0, max: 2.0, step: 0.01 },
    threshold: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
    noiseScale: { value: 1.0, min: 0.1, max: 50.0, step: 0.1 },
  });

  // get access to the camera / audio
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    setupCamera();
  }, []);

  // analyze the audio so that we can manipulate it
  const analyzer = useMemo(() => {
    if (!stream) return null;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    source.connect(analyzer);
    return analyzer;
  }, [stream]);

  const dataArray = useMemo(() => new Uint8Array(128), []);

  function VideoMaterial({ src }) {
    const materialRef = useRef();
    const texture = useVideoTexture(src);

    useFrame((state) => {
      if (materialRef.current && analyzer) {
        analyzer.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
        
        materialRef.current.uAudioVolume = avg / 255;
        materialRef.current.uTime = state.clock.getElapsedTime();
      }
    });

    return (
      <cameraShaderMaterial
        ref={materialRef}
        uTexture={texture}
        uIntensity={intensity}
        uThreshold={threshold}
        uNoiseScale={noiseScale}
        toneMapped={false}
      />
    );
  }

  return (
    <mesh scale={[1.6, 1, 1]}>
      <planeGeometry />
      <Suspense fallback={<meshBasicMaterial color="black" wireframe />}>
        {stream && <VideoMaterial src={stream} />}
      </Suspense>
    </mesh>
  );
}