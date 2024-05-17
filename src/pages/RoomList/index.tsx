import { useNavigate } from 'react-router-dom';
import RoomItem from './components/RoomItem';
import Button from '@components/Button';
import { ROUTES } from '@constants/routes';
import { useSocketContext } from '@contexts/SocketContext';
import { useEffect, useState } from 'react';
import Input from '@components/Input';
import { useAuthContext } from '@contexts/useAuthContext';
import { IRoom } from '@interfaces/user';

export default function RoomList() {
  const navigate = useNavigate();
  const socket = useSocketContext();
  const [roomName, setRoomName] = useState('');
  const { user, login } = useAuthContext();
  const [rooms, setRooms] = useState<IRoom[]>([]);

  // user create room
  useEffect(() => {
    console.log(socket?.current?.id);

    socket?.current?.on('user-create-room-success', async ({ rooms }: { rooms: IRoom[] }) => {
      console.log(rooms);
      setRooms(rooms);
    });

    return () => {
      socket?.current?.off('user-create-room-success');
    };
  }, []);

  useEffect(() => {
    if (!user) {
      const id = new Date().getTime();
      login?.({
        name: `User ${id}`,
        id: `${id}`,
      });
    }
  }, []);

  console.log(socket?.current);

  return (
    <div>
      <div className='title text-white mb-5'>Room List</div>
      <div className='text-white mb-5'>Hello: {user?.name}</div>

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
          onClick={() => {
            socket?.current?.emit('create-room', {
              id: `${new Date().getTime()}`,
              name: roomName,
              users: [user],
            } as IRoom);
          }}
        >
          Create Room
        </Button>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            onClick={() => navigate(ROUTES.ROOM)}
            room={room}
          />
        ))}
      </div>
    </div>
  );
}
