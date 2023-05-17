import React, { useState } from 'react';
import './BurgerMenu.scss';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import Toggle from '../Toggle/Toggle';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleMenuItemClick = () => {
    handleCloseMenu();
  };

  return (
    <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
      <div className="burger-icon" onClick={handleToggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {isOpen && (
        <div className="menu-overlay" onClick={handleCloseMenu}>
          <div className="menu" onClick={(e) => e.stopPropagation()}>
            <NavLink to={ROUTES.signIn} onClick={handleMenuItemClick} className="menu_item">
              Login
            </NavLink>
            <NavLink to={ROUTES.signUp} onClick={handleMenuItemClick} className="menu_item">
              Sign Up
            </NavLink>
            <div className="menu_item">
              Language: <Toggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
