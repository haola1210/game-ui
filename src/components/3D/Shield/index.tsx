/* eslint-disable @typescript-eslint/no-explicit-any */
import { MeshProps, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { DoubleSide, Group, IcosahedronGeometry, Mesh, Vector3 } from 'three';
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

export default Shield;

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
