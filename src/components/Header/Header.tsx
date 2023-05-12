import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import './Header.scss';
import UserBar from './UserBar';
import logo from '../../assets/logo.svg';
import Toggle from '../Toggle/Toggle';
import { useAuthContext } from '../../context/AuthProvider';
import { useState, useEffect } from 'react';

function Header(): JSX.Element {
  const { user } = useAuthContext();

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header sticky-header ${isSticky ? 'is-sticky' : ''}`}>
      <div className="container header__container">
        <div className="header__logo">
          <NavLink to={ROUTES.welcome}>
            <img className="header__logo_img" src={logo} alt="project logo" />
          </NavLink>
        </div>
        {user ? (
          <>
            <nav className="header__nav">
              <NavLink to={ROUTES.welcome} className="header__link">
                Welcome
              </NavLink>
              <NavLink to={ROUTES.editor} className="header__link">
                Editor
              </NavLink>
            </nav>
            <div className="header__right">
              <Toggle />
              <UserBar />
            </div>
          </>
        ) : (
          <div className="header__right">
            <Toggle />
            <UserBar />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
