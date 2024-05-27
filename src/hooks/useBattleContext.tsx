import { IBattle } from '@interfaces/battle';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface IBattleContextProps {
  battleInfo?: IBattle;
  setBattleInfo?: Dispatch<SetStateAction<IBattle | undefined>>;
}

const BattleContext = createContext<IBattleContextProps>({});

export const BattleContextProvider = ({ children }: { children: ReactNode }) => {
  const [battleInfo, setBattleInfo] = useState<IBattle | undefined>();
  return (
    <BattleContext.Provider value={{ battleInfo, setBattleInfo }}>
      {children}
    </BattleContext.Provider>
  );
};

export const useBattleContext = () => useContext(BattleContext);
