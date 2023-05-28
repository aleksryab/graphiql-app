import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../context/AuthProvider';
import LinkButton from '../../components/Buttons/LinkButton';
import ToggleLang from '../ToggleLang';
import Error from '../Error';
import ROUTES from '../../constants/routes';
import LogOutIcon from '../icons/LogOutIcon';
import './UserBar.scss';

function UserBar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      setConnectionError(t('error.general.logout'));
    }
  };

  return (
    <>
      {connectionError && (
        <Error text={connectionError} cleanError={() => setConnectionError(null)} />
      )}
      <div className="user-bar">
        <ToggleLang />
        {user ? (
          <button className="sign-out-button" onClick={handleLogout}>
            <span className="sign-out-button__text">{t('button.sing_out')}</span>
            <LogOutIcon className="sign-out-button__icon" />
          </button>
        ) : (
          <>
            <LinkButton
              to={ROUTES.signIn}
              className="user-bar__button"
              buttonType="outline"
              size="medium"
            >
              {t('button.sing_in')}
            </LinkButton>
            <LinkButton
              to={ROUTES.signUp}
              className="user-bar__button"
              buttonType="solid"
              size="medium"
            >
              {t('button.sing_up')}
            </LinkButton>
          </>
        )}
      </div>
    </>
  );
}

export default UserBar;
