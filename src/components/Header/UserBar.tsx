import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';
import LinkButton from '../../components/Buttons/LinkButton';

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
        <button onClick={handleLogout} className="header__sign_out">
          Sign Out
        </button>
      ) : (
        <>
          <LinkButton
            to={ROUTES.signIn}
            className="header__link"
            buttonType="outline"
            size="medium"
          >
            Login
          </LinkButton>
          <LinkButton to={ROUTES.signUp} className="header__link" buttonType="solid" size="medium">
            Sign Up
          </LinkButton>
        </>
      )}
    </div>
  );
}

export default UserBar;
