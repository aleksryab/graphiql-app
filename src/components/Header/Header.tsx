import { NavLink } from 'react-router-dom';
import './Header.scss';
import UserBar from './UserBar';

function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <nav className="header__nav">
          <NavLink to="/" className="header__link">
            Main
          </NavLink>
          <NavLink to="/welcome" className="header__link">
            Welcome
          </NavLink>
        </nav>
        <UserBar />
      </div>
    </header>
  );
}

export default Header;
