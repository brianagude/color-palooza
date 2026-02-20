import { Instance, Instances } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo } from "react";

export default function Experience() {
  const { boxSize, resolution } = useControls({
    boxSize: {
      value: { x: 0.5, y: 0.5, z: 0.5 },
      step: 0.01,
      max: 1,
      min: 0,
    },
    resolution: {
      value: 10,
      step: 1,
      min: 1,
      max: 40, // 40^3 = 64,000 instances (Very smooth)
    },
  });

  // 1. Memoize the data calculation to prevent lag on boxSize changes
  const { gridData, cellsCount } = useMemo(() => {
    const N = resolution;
    const count = N * N * N;
    const data = [];

    for (let i = 0; i < count; i++) {
      const z = Math.floor(i / (N * N));
      const r = i % (N * N);
      const y = Math.floor(r / N);
      const x = r % N;

      // Pre-calculate colors as arrays [r, g, b] (0 to 1) for performance
      data.push({
        pos: [x, y, z],
        color: [x / N, y / N, z / N],
      });
    }
    return { gridData: data, cellsCount: count };
  }, [resolution]);

  return (
    <group>
      {/* 2. Move helper outside Instances to avoid WebGL errors */}
      <axesHelper args={[5]} />

      <Instances
        // Set limit to your MAX possible resolution (e.g., 40^3)
        limit={64000}
        // Range tells the GPU exactly how many to draw right now
        range={cellsCount}
      >
        {/* 3. Geometry args are reactive and won't crash the loop */}
        <boxGeometry args={[boxSize.x, boxSize.y, boxSize.z]} />
        <meshStandardMaterial />

        {gridData.map((d, i) => (
          <Instance key={i} position={d.pos} color={d.color} />
        ))}
      </Instances>
    </group>
  );
}




// simpler option

export function Experience() {
  const { boxSize, resolution } = useControls({
    boxSize: { value: { x: 0.5, y: 0.5, z: 0.5 }, step: 0.01 },
    resolution: { value: 10, step: 1, min: 1, max: 30 }, // Max 30 = 27,000 cubes
  });

  const N = resolution;
  const cellsCount = N * N * N;

  // We set a high limit (buffer) but only DRAW the current cellsCount
  return (
    <Instances 
      limit={30000} // Allocation (Max possible)
      range={cellsCount} // Current Draw Call
    >
      <boxGeometry args={[boxSize.x, boxSize.y, boxSize.z]} />
      <meshStandardMaterial />

      {/* Generate the grid */}
      {[...Array(cellsCount)].map((_, i) => {
        const z = Math.floor(i / (N * N));
        const r_coord = i % (N * N);
        const y = Math.floor(r_coord / N);
        const x = r_coord % N;

        return (
          <Instance 
            key={i} 
            position={[x, y, z]} 
            color={[x / N, y / N, z / N]} 
          />
        );
      })}
    </Instances>
  );
}



// FINAL BOSS !!

export function Experience() {
  const meshRef = useRef();

  const { boxSize, resolution } = useControls({
    boxSize: { value: 0.8, min: 0.1, max: 1, step: 0.01 },
    resolution: { value: 20, min: 1, max: 50, step: 1 },
  });

  // 1. Pre-calculate constants
  const N = resolution;
  const count = N * N * N;

  // 2. Use a temporary object and color to avoid creating millions of new objects
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    if (!meshRef.current) return;

    let i = 0;
    const offset = (N - 1) / 2; // Center the cube at [0,0,0]

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        for (let z = 0; z < N; z++) {
          const id = i++;

          // Set Position (centered)
          tempObject.position.set(x - offset, y - offset, z - offset);
          tempObject.updateMatrix();
          meshRef.current.setMatrixAt(id, tempObject.matrix);

          // Set Color (normalized 0 to 1)
          // X = Red, Y = Green, Z = Blue
          tempColor.setRGB(x / N, y / N, z / N);
          meshRef.current.setColorAt(id, tempColor);
        }
      }
    }

    // IMPORTANT: Tell the GPU the data has changed
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [N, tempObject, tempColor]);

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* We use the native instancedMesh. 
         args: [geometry, material, count] 
      */}
      <instancedMesh 
        ref={meshRef} 
        args={[null, null, count]} 
        key={count} // Re-mount when count changes to resize the GPU buffer
      >
        <boxGeometry args={[boxSize, boxSize, boxSize]} />
        {/* Use meshLambertMaterial for a good balance of performance and shading */}
        <meshLambertMaterial />
      </instancedMesh>
      
      <axesHelper args={[N]} />
    </group>
  );
}