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
    <div className="error_container" onClick={cleanError}>
      <button className="_button">X</button>
      <p className="_notification">{text}</p>
    </div>
  );
};

export default Error;
