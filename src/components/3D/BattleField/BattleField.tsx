/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Loader,
  // OrbitControls,
  SpriteAnimator,
  // useProgress,
  useSpriteLoader,
} from '@react-three/drei';
import { Canvas, MeshProps, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Perf } from 'r3f-perf';
import { DoubleSide, Group, IcosahedronGeometry, Mesh, Vector3 } from 'three';

interface RowProps {
  x: number;
  spriteDataset: any;
}

const Row = ({ x, spriteDataset }: RowProps) => (
  <group dispose={null}>
    <SpriteAnimator
      fps={20}
      scale={[1.3, 1.3, 1.3]}
      position={[x, -2.5, 0]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      spriteDataset={spriteDataset}
      asSprite={false}
      flipX={x > 0}
    />
    <SpriteAnimator
      fps={20}
      scale={[1.3, 1.3, 1.3]}
      position={[x, -0.5, -1]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      spriteDataset={spriteDataset}
      asSprite={false}
      flipX={x > 0}
    />
    <SpriteAnimator
      fps={20}
      scale={[1.3, 1.3, 1.3]}
      position={[x, 1.5, -2]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      asSprite={false}
      spriteDataset={spriteDataset}
      flipX={x > 0}
    />
  </group>
);

interface HexagonProps extends MeshProps {
  shieldCenter: Vector3;
  opacity?: number;
  color?: string;
}
const Hexagon = ({ shieldCenter, color = '#2196f3', opacity = 0.1, ...props }: HexagonProps) => {
  const ref = useRef<Mesh>(null);
  useEffect(() => {
    ref.current?.lookAt(shieldCenter);
  }, [shieldCenter]);
  return (
    <mesh
      {...props}
      scale={0.1}
      ref={ref}
    >
      <circleGeometry args={[1, 6]} />
      <meshBasicMaterial
        color={color}
        opacity={opacity}
        transparent
        side={DoubleSide}
      />
    </mesh>
  );
};

interface ShieldProps {
  position: Vector3;
}

const Shield = ({ position }: ShieldProps) => {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    ref.current!.rotation.y = 0.5 * clock.getElapsedTime();
  });
  const positions = useMemo(() => {
    const sphereGeometry = new IcosahedronGeometry(1, 4); // Create a sphere geometry
    const vertices = sphereGeometry.attributes.position.array;
    //
    const hexPos: number[][] = [];
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];

      hexPos.push([x, y, z]);
    }

    return hexPos;
  }, []);

  return (
    <group
      position={position}
      ref={ref}
      dispose={null}
    >
      {positions.map((pos, i) => (
        <Hexagon
          key={i}
          position={pos as unknown as Vector3}
          shieldCenter={new Vector3(...position)}
        />
      ))}
    </group>
  );
};

// interface AssetsConatinerProps {}
const AssetsConatiner = () => {
  const { spriteObj } = useSpriteLoader('src/assets/sprite.png', null, null, 23);

  return (
    <group dispose={null}>
      <Row
        x={-8}
        spriteDataset={spriteObj}
      />
      <Row
        x={-6}
        spriteDataset={spriteObj}
      />
      <Row
        x={-4}
        spriteDataset={spriteObj}
      />
      <Row
        x={4}
        spriteDataset={spriteObj}
      />
      <Row
        x={6}
        spriteDataset={spriteObj}
      />
      <Row
        x={8}
        spriteDataset={spriteObj}
      />
    </group>
  );
};

export default function BattleField() {
  return (
    <div className='bg-black w-screen h-screen overflow-hidden flex justify-center items-center;'>
      <Canvas
        orthographic
        gl={{ alpha: true, antialias: true }}
        camera={{
          position: [0, 0, 100],
          zoom: 50,
        }}
      >
        <Perf position='bottom-right' />
        <color
          attach='background'
          args={[0xfff0ea]}
        />
        <ambientLight intensity={0.2} />
        <directionalLight
          color='white'
          position={[0, 7, 5]}
        />
        {/* <OrbitControls /> */}
        <Shield position={[-4, -2.5, 0] as unknown as Vector3} />
        <Suspense fallback={null}>
          <AssetsConatiner />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}
