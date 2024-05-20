import RoomItem from '@components/ListItem';
import { useSocketContext } from '@contexts/SocketContext';
import { IRoom } from '@interfaces/user';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Room() {
  const params = useParams();
  const socket = useSocketContext();
  const [roomInfo, setRoomInfo] = useState<IRoom | undefined>(undefined);

  useEffect(() => {
    socket?.current?.emit('user-get-room-detail', { room_id: params.id });
  }, []);

  useEffect(() => {
    socket?.current?.on('user-get-room-detail-success', ({ room }: { room: IRoom }) => {
      setRoomInfo(room);
    });

    return () => {
      socket?.current?.off('user-get-room-detail-success');
    };
  }, []);

  // some one join room
  useEffect(() => {
    socket?.current?.on('someone-join-room-success', ({ room }: { room: IRoom }) => {
      setRoomInfo(room);
    });

    return () => {
      socket?.current?.off('someone-join-room-success');
    };
  }, []);

  return (
    <div className='text-white'>
      <div className='mb-5'>Room: {roomInfo?.name}</div>
      <div className='grid grid-cols-2 gap-4'>
        {roomInfo?.users.map((roomate) => (
          <RoomItem
            key={roomate.id}
            name={roomate.name}
          ></RoomItem>
        ))}
      </div>
    </div>
  );
}
