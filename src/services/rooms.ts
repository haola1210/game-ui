import { IRoom } from '@interfaces/user';
import { axiosInstance } from './axios';

const roomUrl = '/rooms';

export const getAllRoom = async () => {
  const result = await axiosInstance.get(`${roomUrl}/all`);
  return result.data as IRoom[];
};

export const getRoomById = async (id?: string) => {
  const result = await axiosInstance.get(`${roomUrl}/${id}`);
  return result.data as IRoom;
};
