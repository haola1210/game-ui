import { IBattle } from '@interfaces/battle';
import { axiosInstance } from './axios';

const baseBattleUrl = `/matchs`;

export const getInitBattle = async (player1Id?: string, player2Id?: string): Promise<IBattle> => {
  const result = await axiosInstance.get(
    `${baseBattleUrl}/solo/${player1Id ?? ``}/${player2Id ?? ``}`,
  );
  return result.data;
};
