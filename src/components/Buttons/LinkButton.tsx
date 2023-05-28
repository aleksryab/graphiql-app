import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ButtonSize, ButtonType } from './Button';
import './Button.scss';

interface LinkButtonProps {
  to: string;
  className?: string;
  buttonType?: ButtonType;
  size?: ButtonSize;
  children: ReactNode;
}

function LinkButton({
  to,
  className = '',
  size = 'medium',
  buttonType = 'solid',
  children,
}: LinkButtonProps) {
  const buttonClassName = `button ${buttonType} ${size} ${className}`;

  return (
    <Link to={to} className={buttonClassName}>
      {children}
    </Link>
  );
}

export default LinkButton;
