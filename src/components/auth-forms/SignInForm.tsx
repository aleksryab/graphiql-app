import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { FirebaseError } from 'firebase/app';
import ROUTES from '../../constants/routes';
import Parallax from '../../components/Parallax/Parallax';
import './SignIn.scss';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await signIn(email, password);
      navigate(ROUTES.main);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Parallax color="dark">
      <div className="sign_in">
        <h3 className="sign_in__title">Hi, Welcome Back! 👋</h3>

        <form onSubmit={handleSubmit} className="sign_in__form">
          <div>
            <label className="sign_in__form_label">
              Email
              <input
                className="sign_in__form_input"
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="sign_in__form_label">
              Password
              <input
                className="sign_in__form_input"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {isSubmitting ? (
            <p>Signing in...</p>
          ) : (
            <button type="submit" className="sign_in__form_button">
              Login
            </button>
          )}
        </form>

        {error && <p>{error}</p>}

        <p className="sign_in__text">
          Don’t have an account?
          <Link to={ROUTES.signUp} className="sign_in__text_link">
            Sign Up
          </Link>
        </p>
      </div>
    </Parallax>
  );
}

export default SignInForm;
