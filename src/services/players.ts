import { IPlayer } from '@interfaces/player';
import { axiosInstance } from './axios';

const playerUrl = `players`;

export const getPlayerByName = async (name: string) => {
  const result = await axiosInstance.get(`${playerUrl}/${name}`);
  return result.data as IPlayer | '';
};
