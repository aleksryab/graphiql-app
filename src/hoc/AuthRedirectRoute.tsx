import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';

function AuthRedirectRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default AuthRedirectRoute;
