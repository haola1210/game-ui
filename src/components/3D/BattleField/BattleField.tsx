import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Suspense, useEffect } from 'react';
import AssetsContainer from '../AssetsContainer';
import { useBattleContext } from '@hooks/useBattleContext';
import { iIFE } from '@utils/index';
import { getInitBattle } from '@services/battle';
import Shield from '../Shield';
import { Vector3 } from 'three';

interface IBattleFieldProps {
  idPlayer1?: string;
  idPlayer2?: string;
}

export default function BattleField({ idPlayer1, idPlayer2 }: IBattleFieldProps) {
  const { setBattleInfo } = useBattleContext();

  useEffect(() => {
    iIFE(async () => {
      const battleInfo = await getInitBattle(idPlayer1, idPlayer2);
      setBattleInfo?.(battleInfo);
    });
  }, []);

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
          <AssetsContainer />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}
