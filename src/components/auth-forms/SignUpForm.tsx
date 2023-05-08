import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { FirebaseError } from 'firebase/app';
import ROUTES from '../../constants/routes';

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
    <div>
      <h3>Create an account</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {isSubmitting ? <p>Signing up...</p> : <button type="submit">Sign Up</button>}
      </form>
      {error && <p>{error}</p>}
      <p>
        Already have an account?
        <Link to={ROUTES.signIn} className="header__link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignUpForm;
