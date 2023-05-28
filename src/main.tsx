import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import FallbackError from './components/FallbackError';
import './index.scss';
import './translation/translation_init';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary FallbackComponent={FallbackError}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);
