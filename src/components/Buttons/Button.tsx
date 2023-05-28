import { FC, ButtonHTMLAttributes } from 'react';
import './Button.scss';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'solid' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  buttonType?: ButtonType;
  square?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  className = '',
  size = 'medium',
  buttonType = 'solid',
  square = false,
  ...rest
}) => {
  const buttonClassName = `button ${buttonType} ${size} ${square ? 'square' : ''} ${className}`;

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
