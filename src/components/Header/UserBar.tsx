import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';

function UserBar() {
  const { user, logout } = useAuthContext();

  return (
    <div className="user-bar">
      {user ? (
        <button onClick={logout}>Sign Out</button>
      ) : (
        <>
          <Link to="/signin" className="header__link">
            Login
          </Link>
          <Link to="/signup" className="header__link">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}

export default UserBar;
