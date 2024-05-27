import { useNavigate } from 'react-router-dom';
import ListItem from '../../components/ListItem';
import Button from '@components/Button';
import { ROUTES } from '@constants/routes';
import { useSocketContext } from '@contexts/SocketContext';
import { useEffect, useState } from 'react';
import Input from '@components/Input';
import { useAuthContext } from '@contexts/useAuthContext';
import { IRoom } from '@interfaces/player';
import { iIFE } from '@utils/index';
import { getAllRoom } from '@services/rooms';

export default function RoomList() {
  const navigate = useNavigate();
  const socket = useSocketContext();
  const [roomName, setRoomName] = useState('');
  const { user: currentUser } = useAuthContext();
  const [rooms, setRooms] = useState<IRoom[]>([]);

  // get initial room
  useEffect(() => {
    socket?.current?.emit('user-get-room');
  }, []);

  useEffect(() => {
    socket?.current?.on('user-get-room-success', async ({ rooms }: { rooms: IRoom[] }) => {
      setRooms(rooms);
    });

    return () => {
      socket?.current?.off('user-get-room-success');
    };
  }, []);

  // user create room
  useEffect(() => {
    socket?.current?.on(
      'user-create-room-success',
      async ({ rooms, playerId, room }: { rooms: IRoom[]; playerId: string; room: IRoom }) => {
        setRooms(rooms);
        if (currentUser?.id === playerId) {
          navigate(`${ROUTES.ROOM}/${room.id}`);
        }
      },
    );

    return () => {
      socket?.current?.off('user-create-room-success');
    };
  }, [currentUser]);

  // user join room => update list,
  useEffect(() => {
    socket?.current?.on(
      'user-join-room-success',
      ({ rooms, playerId, room }: { rooms: IRoom[]; playerId: string; room: IRoom }) => {
        setRooms(rooms);
        if (playerId === currentUser?.id) {
          navigate(`${ROUTES.ROOM}/${room.id}`);
        }
      },
    );
    return () => {
      socket?.current?.off('user-join-room-success');
    };
  }, [currentUser]);

  // if !user => create user

  useEffect(() => {
    iIFE(async () => {
      const data = await getAllRoom();
      setRooms(data);
    });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.LOGIN);
    }
  }, [currentUser]);

  return (
    <div>
      <div className='title text-white mb-5'>Room List</div>
      <div className='text-white mb-5'>Hello: {currentUser?.name}</div>

      <div className='mb-5'>
        Room name:
        <Input
          label='room name'
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>

      <div className='mb-10'>
        <Button
          onClick={() =>
            socket?.current?.emit('user-create-room', {
              playerId: currentUser?.id,
              roomData: {
                name: roomName,
              },
            })
          }
        >
          Create Room
        </Button>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        {rooms.map((room) => (
          <ListItem
            key={room.id}
            onClick={() =>
              socket?.current?.emit('user-join-room', {
                playerId: currentUser?.id,
                roomId: room.id,
              })
            }
            name={room.name}
            quantity={room.players.length}
          />
        ))}
      </div>
    </div>
  );
}
