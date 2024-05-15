import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...rest }: IButtonProps) {
  return (
    <button
      className={`btn ${className}`}
      {...rest}
    ></button>
  );
}
