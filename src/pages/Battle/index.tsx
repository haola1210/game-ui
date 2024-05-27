import { BattleField } from '@components/3D';
import { BattleContextProvider } from '@hooks/useBattleContext';
import { useParams } from 'react-router-dom';

export default function Battle() {
  const { idPlayer1, idPlayer2 } = useParams();

  return (
    <BattleContextProvider>
      <BattleField
        idPlayer1={idPlayer1}
        idPlayer2={idPlayer2}
      />
    </BattleContextProvider>
  );
}
