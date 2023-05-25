import { useEffect } from 'react';
import './Error.scss';

interface ErrorProps {
  text: string;
  cleanError: () => void;
}

const CLOSE_INTERVAL = 10000;

const Error = ({ text, cleanError }: ErrorProps) => {
  useEffect(() => {
    const timeout = setTimeout(cleanError, CLOSE_INTERVAL);
    return () => clearTimeout(timeout);
  }, [cleanError]);

  return (
    <div className="error-message" onClick={cleanError}>
      <button className="error-message__button">X</button>
      <p className="error-message__notification">{text}</p>
      <div className="error-message__timer" />
    </div>
  );
};

export default Error;
