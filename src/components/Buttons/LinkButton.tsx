import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Button, { ButtonSize, ButtonType } from './Button';

interface LinkButtonProps {
  to: string;
  className?: string;
  buttonType?: ButtonType;
  size?: ButtonSize;
  children: ReactNode;
}

function LinkButton({ to, className = '', buttonType, size, children }: LinkButtonProps) {
  return (
    <Link to={to} className={`header__link ${className}`}>
      <Button buttonType={buttonType} size={size}>
        {children}
      </Button>
    </Link>
  );
}

export default LinkButton;
