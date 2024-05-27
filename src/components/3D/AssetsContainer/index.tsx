import { useSpriteLoader } from '@react-three/drei';
import RowNinja from '../RowNinja';
import { useBattleContext } from '@hooks/useBattleContext';

const AssetsContainer = () => {
  const { spriteObj } = useSpriteLoader('src/assets/sprite.png', null, null, 23);

  const { battleInfo } = useBattleContext();

  return (
    <group dispose={null}>
      {battleInfo?.team1.map((item) => (
        <RowNinja
          x={-8}
          spriteDataset={spriteObj}
        />
      ))}

      <RowNinja
        x={-6}
        spriteDataset={spriteObj}
      />
      <RowNinja
        x={-4}
        spriteDataset={spriteObj}
      />
      <RowNinja
        x={4}
        spriteDataset={spriteObj}
      />
      <RowNinja
        x={6}
        spriteDataset={spriteObj}
      />
      <RowNinja
        x={8}
        spriteDataset={spriteObj}
      />
    </group>
  );
};

export default AssetsContainer;
