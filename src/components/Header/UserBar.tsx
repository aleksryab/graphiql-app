import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';
import Button from '../Buttons/Button';

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
            <Button buttonType="outline" size="medium">
              Login
            </Button>
          </Link>
          <Link to={ROUTES.signUp} className="header__link">
            <Button buttonType="solid" size="medium">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default UserBar;
