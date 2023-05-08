import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/welcome" />;
  }
  return children;
}

export default PrivateRoute;
