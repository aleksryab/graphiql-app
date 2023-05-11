import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import './Header.scss';
import UserBar from './UserBar';
import logo from '../../assets/logo.svg';
import Toggle from '../Toggle/Toggle';
import { useAuthContext } from '../../context/AuthProvider';

function Header(): JSX.Element {
  const { user } = useAuthContext();

  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__logo">
          <NavLink to={ROUTES.welcome}>
            <img className="header__logo_img" src={logo} alt="project logo" />
          </NavLink>
        </div>
        {user ? (
          <>
            <nav className="header__nav">
              {/* <NavLink to={ROUTES.main} className="header__link">
                Main
              </NavLink> */}
              <NavLink to={ROUTES.welcome} className="header__link">
                Welcome
              </NavLink>
              <NavLink to={ROUTES.editor} className="header__link">
                Editor
              </NavLink>
            </nav>
            <Toggle />
            <UserBar />
          </>
        ) : (
          <>
            <Toggle />
            <UserBar />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
