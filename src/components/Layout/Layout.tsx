import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackError from '../FallbackError';
import Footer from '../Footer';
import Header from '../Header';
import './Layout.scss';

function Layout() {
  return (
    <>
      <Header />
      <main className="main container">
        <ErrorBoundary FallbackComponent={FallbackError}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
