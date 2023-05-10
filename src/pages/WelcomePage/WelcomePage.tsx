import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';
import './Welcome.scss';
import Parallax from '../../components/Parallax/Parallax';
import Button from '../../components/Buttons/Button';

function WelcomePage() {
  const { user } = useAuthContext();

  return (
    <Parallax>
      <div className="welcome_content container">
        {user ? (
          <p className="welcome_content__greeting">Welcome {user.email}!</p>
        ) : (
          <>
            <p className="welcome_content__greeting">Welcome!</p>
            <p className="welcome_content__text">This is a playground for graphiQL requests.</p>
            <p className="welcome_content__text">Please login or register to continue.</p>
            <Link to={ROUTES.signIn}>
              <Button buttonType="solid" size="large" className="welcome_content__button">
                Get started{' '}
              </Button>
            </Link>
          </>
        )}
      </div>
    </Parallax>
  );
}

export default WelcomePage;
