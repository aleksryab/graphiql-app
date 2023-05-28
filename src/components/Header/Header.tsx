import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';
import BurgerMenu from '../BurgerMenu';
import UserBar from './UserBar';
import logo from '../../assets/logo.svg';
import './Header.scss';

function Header(): JSX.Element {
  const { user } = useAuthContext();
  const { t } = useTranslation('common');

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
          <NavLink to={ROUTES.main}>
            <img className="header__logo_img" src={logo} alt="project logo" />
          </NavLink>
        </div>
        {user ? (
          <>
            <nav className="header__nav">
              <NavLink to={ROUTES.welcome} className="header__link">
                {t('routes.welcome')}
              </NavLink>
              <NavLink to={ROUTES.editor} className="header__link">
                {t('routes.editor')}
              </NavLink>
            </nav>
            <div className="header__right">
              <UserBar />
              <BurgerMenu />
            </div>
          </>
        ) : (
          <div className="header__right">
            <UserBar />
            <BurgerMenu />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
