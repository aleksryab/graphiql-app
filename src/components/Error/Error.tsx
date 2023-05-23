import { useEffect } from 'react';
import './Error.scss';

interface ErrorProps {
  text: string;
  cleanError: (clean: null) => void;
}

const CLOSE_INTERVAL = 10000;

const Error = ({ text, cleanError }: ErrorProps) => {
  useEffect(() => {
    setTimeout(clean, CLOSE_INTERVAL);
  }, []);

  const clean = () => {
    cleanError(null);
  };

  return (
    <div className="error_container" onClick={clean}>
      <button className="_button">X</button>
      <p className="_notification">{text}</p>
    </div>
  );
};

export default Error;
