import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthProvider from './context/AuthProvider';
import AuthRoute from './hoc/AuthRoute';
import PrivateRoute from './hoc/PrivateRoute';
import EditorPage from './pages/EditorPage';
import ROUTES from './constants/routes';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={ROUTES.main} element={<Layout />}>
          <Route
            index
            element={<PrivateRoute component={<Navigate to={ROUTES.editor} replace={true} />} />}
          />
          <Route path={ROUTES.editor} element={<PrivateRoute component={<EditorPage />} />} />
          <Route path={ROUTES.welcome} element={<WelcomePage />} />
          <Route path={ROUTES.signIn} element={<AuthRoute component={<SignInPage />} />} />
          <Route path={ROUTES.signUp} element={<AuthRoute component={<SignUpPage />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
