import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { FirebaseError } from 'firebase/app';

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
      navigate('/');
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
      <h3>Hi, Welcome Back! 👋</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
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
        {isSubmitting ? <p>Signing in...</p> : <button type="submit">Login</button>}
      </form>

      {error && <p>{error}</p>}

      <p>
        Don’t have an account?
        <Link to="/signup" className="header__link">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignInForm;
