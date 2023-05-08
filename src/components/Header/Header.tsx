import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import './Header.scss';
import UserBar from './UserBar';

function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <nav className="header__nav">
          <NavLink to={ROUTES.main} className="header__link">
            Main
          </NavLink>
          <NavLink to={ROUTES.welcome} className="header__link">
            Welcome
          </NavLink>
        </nav>
        <UserBar />
      </div>
    </header>
  );
}

export default Header;
