import { CSSTransition } from 'react-transition-group';
import './Fade.scss';

interface FadeProps {
  isVisible: boolean;
  children: JSX.Element;
}

function Fade({ isVisible, children }: FadeProps) {
  return (
    <CSSTransition
      in={isVisible}
      timeout={{ appear: 0, enter: 500, exit: 500 }}
      classNames={'fade'}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
}

export default Fade;
