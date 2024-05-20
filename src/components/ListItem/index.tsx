interface IRoomItemProps {
  onClick?: () => void;
  name?: string;
  quantity?: number;
}

export default function ListItem({ onClick, name, quantity }: IRoomItemProps) {
  return (
    <div
      className='bg-blue-500 p-4 text-white rounded-2xl cursor-pointer flex justify-between'
      onClick={onClick}
    >
      <div>{name ?? ``}</div>
      {quantity && <div>{quantity}/2</div>}
    </div>
  );
}
