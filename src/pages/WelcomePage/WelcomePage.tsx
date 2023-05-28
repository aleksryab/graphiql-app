import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';
import Parallax from '../../components/Parallax/Parallax';
import LinkButton from '../../components/Buttons/LinkButton';
import './Welcome.scss';
import { useTranslation } from 'react-i18next';

function WelcomePage() {
  const { user } = useAuthContext();
  const { t } = useTranslation('common');

  return (
    <Parallax color={'light'}>
      <div className="welcome_content container">
        <div className="welcome_content_message">
          {user ? (
            <>
              <p className="welcome_content__greeting">
                <span>{t('welcome.welcome')}</span>
                <br />
                <span className="welcome_content__greeting_user">{user.email}!</span>
              </p>
              <p className="welcome_content__text">{t('welcome.ready')}</p>
              <LinkButton
                to={ROUTES.editor}
                buttonType="solid"
                size="large"
                className="welcome_content__button"
              >
                {t('button.moving')}
              </LinkButton>
            </>
          ) : (
            <>
              <p className="welcome_content__greeting">{t('welcome.welcome')}!</p>
              <p className="welcome_content__text">{t('welcome.content')}</p>
              <p className="welcome_content__text">{t('welcome.login')}</p>
              <LinkButton
                to={ROUTES.signIn}
                buttonType="solid"
                size="large"
                className="welcome_content__button"
              >
                {t('button.start')}
              </LinkButton>
            </>
          )}
        </div>
      </div>
    </Parallax>
  );
}

export default WelcomePage;
