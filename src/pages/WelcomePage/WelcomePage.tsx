import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';

function WelcomePage() {
  const { user } = useAuthContext();
  return (
    <div>
      <h2>This is Welcome Page</h2>
      {user ? (
        <p>Hello {user.email}</p>
      ) : (
        <>
          <p>Hello unknown user.</p>
          <p>
            <Link to={ROUTES.signIn}>Sign in</Link> or <Link to={ROUTES.signUp}>Sign up</Link>{' '}
            please
          </p>
        </>
      )}
    </div>
  );
}

export default WelcomePage;
