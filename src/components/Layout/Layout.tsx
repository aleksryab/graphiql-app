import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import './Layout.scss';

function Layout() {
  return (
    <>
      <Header />
      <main className="main container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
