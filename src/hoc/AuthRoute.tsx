import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
import ROUTES from '../constants/routes';

function AuthRoute({ component }: { component: JSX.Element }) {
  const { isLoading, user } = useAuthContext();

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to={ROUTES.main} />;
  }

  return component;
}

export default AuthRoute;
