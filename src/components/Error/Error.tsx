import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaExclamationCircle } from 'react-icons/fa';
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
  }, []);

  return (
    <div className="error-message">
      <div className="error-message__top-bar">
        <div className="error-message__top-bar_start">
          <FaExclamationCircle className="error-message__icon" />
          <p className="error-title">Error</p>
        </div>
        <button className="error-message__button" onClick={cleanError}>
          <AiOutlineClose />
        </button>
      </div>
      <p className="error-message__notification">{text}</p>
      <div className="error-message__timer" />
    </div>
  );
};

export default Error;
