import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { FirebaseError } from 'firebase/app';
import ROUTES from '../../constants/routes';
import './SignIn.scss';
import Parallax from '../../components/Parallax/Parallax';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await signUp(email, password);
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
        <h3 className="sign_in__title">Create an account</h3>

        <form onSubmit={handleSubmit} className="sign_in__form">
          <div>
            <label className="sign_in__form_label">
              Email
              <input
                className="sign_in__form_input"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
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
            <p>Signing up...</p>
          ) : (
            <button type="submit" className="sign_in__form_button">
              Sign Up
            </button>
          )}
        </form>
        {error && <p>{error}</p>}
        <p className="sign_in__text">
          Already have an account?
          <Link to={ROUTES.signIn} className="sign_in__text_link">
            Login
          </Link>
        </p>
      </div>
    </Parallax>
  );
}

export default SignUpForm;
