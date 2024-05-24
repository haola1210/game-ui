interface IRoomItemProps {
  onClick?: () => void;
  name?: string;
  quantity?: number;
  className?: string;
}

export default function ListItem({ onClick, name, quantity, className }: IRoomItemProps) {
  return (
    <div
      className={`bg-blue-500 p-4 text-white rounded-2xl cursor-pointer flex justify-between ${className ?? ``}`}
      onClick={onClick}
    >
      <div>{name ?? ``}</div>
      {quantity && <div>{quantity}/2</div>}
    </div>
  );
}
