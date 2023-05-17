import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { FirebaseError } from 'firebase/app';
import ROUTES from '../../constants/routes';
import { emailRegEx, passwordRegEx } from './utils';
import './SignIn.scss';

interface FormInput {
  email: string;
  password: string;
}

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      await signUp(data.email, data.password);
      navigate(ROUTES.editor);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setServerError(err.message);
      } else {
        console.error(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sign_in">
      <h3 className="sign_in__title">Create an account</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="sign_in__form">
        <div className="sign_in__form_field">
          <label className="sign_in__form_label">
            Email
            <input
              className={`sign_in__form_input${errors.email ? ' error' : ''}`}
              type="email"
              id="email"
              placeholder="yours@example.com"
              {...register('email', {
                required: `Can't be blank`,
                pattern: { value: emailRegEx, message: 'Enter valid email: yours@example.com' },
              })}
            />
          </label>
          {errors.email && <span className="sign_in_error">{errors.email.message}</span>}
        </div>
        <div className="sign_in__form_field">
          <label className="sign_in__form_label">
            Password
            <input
              className={`sign_in__form_input${errors.password ? ' error' : ''}`}
              type="password"
              id="password"
              placeholder="Enter Your Password"
              {...register('password', {
                required: `Can't be blank`,
                pattern: {
                  value: passwordRegEx,
                  message:
                    'Password must contain at least 8 characters, at least one letter, one number, one special character',
                },
              })}
            />
          </label>
          {errors.password && <span className="sign_in_error">{errors.password.message}</span>}
        </div>
        <div className="sign_in__form_submit">
          {isSubmitting ? (
            <p className="sign_in_message">Signing Up...</p>
          ) : (
            <button type="submit" className="sign_in__form_button">
              Sign Up
            </button>
          )}
        </div>
      </form>
      {serverError && <p className="sign_in_error">{serverError}</p>}
      <p className="sign_in__text">
        Already have an account?
        <Link to={ROUTES.signIn} className="sign_in__text_link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignUpForm;
