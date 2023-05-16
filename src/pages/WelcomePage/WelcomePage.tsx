import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';
import Parallax from '../../components/Parallax/Parallax';
import LinkButton from '../../components/Buttons/LinkButton';
import './Welcome.scss';

function WelcomePage() {
  const { user } = useAuthContext();

  return (
    <Parallax color={'light'}>
      <div className="welcome_content container">
        <div className="welcome_content_message">
          {user ? (
            <>
              <p className="welcome_content__greeting">Welcome {user.email}!</p>
              <p className="welcome_content__text">Playground for graphiQL requests ready to use</p>
              <LinkButton
                to={ROUTES.editor}
                buttonType="solid"
                size="large"
                className="welcome_content__button"
              >
                Go to editor
              </LinkButton>
            </>
          ) : (
            <>
              <p className="welcome_content__greeting">Welcome!</p>
              <p className="welcome_content__text">This is a playground for graphiQL requests.</p>
              <p className="welcome_content__text">Please login or register to continue.</p>
              <LinkButton
                to={ROUTES.signIn}
                buttonType="solid"
                size="large"
                className="welcome_content__button"
              >
                Get started
              </LinkButton>
            </>
          )}
        </div>
      </div>
    </Parallax>
  );
}

export default WelcomePage;
