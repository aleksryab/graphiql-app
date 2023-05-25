import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackError from './components/FallbackError';
import App from './App';
import './index.scss';
import './translation/translation_init';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={FallbackError}>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
);
