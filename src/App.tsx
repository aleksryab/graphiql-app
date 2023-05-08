import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthProvider from './context/AuthProvider';
import AuthRedirectRoute from './hoc/AuthRedirectRoute';
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
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route path={ROUTES.welcome} element={<WelcomePage />} />
          <Route
            path={ROUTES.signIn}
            element={
              <AuthRedirectRoute>
                <SignInPage />
              </AuthRedirectRoute>
            }
          />
          <Route
            path={ROUTES.signUp}
            element={
              <AuthRedirectRoute>
                <SignUpPage />
              </AuthRedirectRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path={ROUTES.editor} element={<EditorPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
