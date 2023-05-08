import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';

function WelcomePage() {
  const { user } = useAuthContext();
  return (
    <div>
      <h2>This is Welcome Page</h2>
      {user ? (
        <p>Hello {user.email}</p>
      ) : (
        <>
          {' '}
          <p>Hello unknown user.</p>{' '}
          <p>
            <Link to="/signin">Sign in</Link> please
          </p>
        </>
      )}
    </div>
  );
}

export default WelcomePage;
