const marblesCount = useMemo(() => {
  const min = 400;
  const max = 1200;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}, []);

const marbles = useMemo(() => {
    const instances = [];
    for (let i = 0; i < marblesCount; i++) {
      instances.push({
        key: `instance_${i}`,
        position: [
          (Math.random() - 0.5) * 4, // Smaller spread to fit in jar
          6 + i * 0.2,
          (Math.random() - 0.5) * 4,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }
    return instances;
  }, [marblesCount]);


  <InstancedRigidBodies
    instances={marbles}
    colliders="ball"
    ref={rigidBodyRef}
  >
    <instancedMesh
      castShadow
      receiveShadow
      args={[null, null, marblesCount]}
      ref={marbleRef}
    >
      <sphereGeometry args={[marbleRadius, 32, 16]} />
      <meshPhysicalMaterial transmission={0.9} thickness={0.5} roughness={0.05} />
    </instancedMesh>
  </InstancedRigidBodies>


const positions = [...Array(100)].map((_, i) => [
    (i % 10) - 4.5, // x position
    Math.floor(i / 10) - 4.5, // y position
    0, // z position
  ]);

    return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      
      {/* Define the InstancedMesh structure */}
      <Instances>
        {/* Specify the shared geometry and material */}
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="hotpink" />

        {/* Place individual instances */}
        {positions.map((position, i) => (
          <Instance key={i} position={position} />
        ))}
      </Instances>
      <OrbitControls />
    </Canvas>
    )

return (
<Instances ref={ref} limit={20}>
  <boxGeometry />
  <someSpecialMaterial />
  <InstancedAttribute name="foo" defaultValue={1} />
  <Instance position={[-1.2, 0, 0]  
  </Instances>
)