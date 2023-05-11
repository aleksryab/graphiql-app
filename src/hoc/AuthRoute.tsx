import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import Loading from '../components/Loading';

function AuthRoute({ component }: { component: JSX.Element }) {
  const { isLoading, user } = useAuthContext();

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return component;
}

export default AuthRoute;
