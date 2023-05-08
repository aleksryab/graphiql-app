import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';

function UserBar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-bar">
      {user ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <>
          <Link to={ROUTES.signIn} className="header__link">
            Login
          </Link>
          <Link to={ROUTES.signUp} className="header__link">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}

export default UserBar;
