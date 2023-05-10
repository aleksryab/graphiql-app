import { FC, ButtonHTMLAttributes } from 'react';
import './Button.scss';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonType = 'solid' | 'outline';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  buttonType?: ButtonType;
};

const Button: FC<ButtonProps> = ({
  children,
  className,
  size = 'medium',
  buttonType = 'solid',
  ...rest
}) => {
  const buttonClassName = `button ${buttonType} ${size} ${className}`;

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
