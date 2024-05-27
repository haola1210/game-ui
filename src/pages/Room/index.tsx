import Button from '@components/Button';
import RoomItem from '@components/ListItem';
import { ROUTES } from '@constants/routes';
import { useSocketContext } from '@contexts/SocketContext';
import { useAuthContext } from '@contexts/useAuthContext';
import { IRoom } from '@interfaces/player';
import { getRoomById } from '@services/rooms';
import { iIFE } from '@utils/index';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Room() {
  const { user } = useAuthContext();
  const params = useParams();
  const socket = useSocketContext();
  const navigate = useNavigate();
  const [roomInfo, setRoomInfo] = useState<IRoom | undefined>(undefined);

  useEffect(() => {
    iIFE(async () => {
      const data = await getRoomById(params.id);
      setRoomInfo(data);
    });
  }, [params]);

  // some one join room
  useEffect(() => {
    socket?.current?.on('someone-join-room-success', ({ room }: { room: IRoom }) => {
      setRoomInfo(room);
    });

    return () => {
      socket?.current?.off('someone-join-room-success');
    };
  }, []);

  useEffect(() => {
    socket?.current?.on('user-start-game-success', () => {
      navigate(`${ROUTES.BATTLE}/${roomInfo?.players[0]?.id}/${roomInfo?.players[1]?.id}`);
    });

    return () => {
      socket?.current?.off('user-start-game-success');
    };
  }, [roomInfo]);

  return (
    <div className='text-white'>
      <div className='mb-5'>Room: {roomInfo?.name}</div>
      <div className='grid grid-cols-2 gap-4'>
        {roomInfo?.players?.map((roommate) => (
          <RoomItem
            key={roommate.id}
            name={roommate.name}
            className={user?.id === roommate.id ? `!bg-orange-400` : ``}
          ></RoomItem>
        ))}
      </div>
      <div className='mt-5 text-right'>
        <Button onClick={() => socket?.current?.emit('user-start-game', { roomId: params.id })}>
          Start game
        </Button>
      </div>
    </div>
  );
}
