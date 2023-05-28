import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';
import ToggleLang from '../ToggleLang';
import Fade from '../Fade';
import LogOutIcon from '../icons/LogOutIcon';
import './BurgerMenu.scss';

const BurgerMenu: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const { t } = useTranslation('common');

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

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

      <Fade isVisible={isOpen}>
        <div className="menu-overlay" onClick={handleCloseMenu}>
          <div className="menu" onClick={(e) => e.stopPropagation()}>
            {user ? (
              <>
                <NavLink to={ROUTES.welcome} onClick={handleMenuItemClick} className="menu_item">
                  {t('routes.welcome')}
                </NavLink>
                <NavLink to={ROUTES.editor} onClick={handleMenuItemClick} className="menu_item">
                  {t('routes.editor')}
                </NavLink>
                <div className="menu_item">
                  {t('languages.language')}: <ToggleLang />
                </div>
                <button className="menu_item_exit menu_item" onClick={handleLogout}>
                  <span className="menu_item_text">{t('button.sing_out')}</span>
                  <LogOutIcon className="menu_item_icon" />
                </button>
              </>
            ) : (
              <>
                <NavLink to={ROUTES.signIn} onClick={handleMenuItemClick} className="menu_item">
                  {t('button.sing_in')}
                </NavLink>
                <NavLink to={ROUTES.signUp} onClick={handleMenuItemClick} className="menu_item">
                  {t('button.sing_up')}
                </NavLink>
                <div className="menu_item">
                  {t('languages.language')}: <ToggleLang />
                </div>
              </>
            )}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default BurgerMenu;
