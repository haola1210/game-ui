import { SpriteAnimator } from '@react-three/drei';

interface RowProps {
  x: number;
  spriteDataset: any;
}

const RowNinja = ({ x, spriteDataset }: RowProps) => (
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

export default RowNinja;
