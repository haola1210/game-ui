import { IRoom } from '@interfaces/user';

interface IRoomItemProps {
  onClick?: () => void;
  room?: IRoom;
}

export default function RoomItem({ onClick, room }: IRoomItemProps) {
  return (
    <div
      className='bg-blue-500 p-4 text-white rounded-2xl cursor-pointer'
      onClick={onClick}
    >
      {room?.name}
    </div>
  );
}
