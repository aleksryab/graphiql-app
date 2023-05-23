import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { useAuthContext } from '../../context/AuthProvider';
import ROUTES from '../../constants/routes';
import getFirebaseErrorMessage from './helpers/getFirebaseErrorMessage';
import { emailRegEx, passwordRegEx } from './utils';
import './SignIn.scss';
import Error from '../Error/Error';

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
  const { t } = useTranslation('common');
  const [connectionError, setConnectionError] = useState<string | null>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      await signUp(data.email, data.password);
      navigate(ROUTES.editor);
    } catch (err) {
      if (err instanceof FirebaseError) {
        const messageId = getFirebaseErrorMessage(err.code);
        const message = messageId ? t(messageId) : err.message;
        setServerError(message);
      } else {
        setConnectionError(err as string);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {connectionError && <Error text={connectionError} cleanError={setConnectionError} />}
      <div className="sign_in">
        <h3 className="sign_in__title">{t('login.create_account')}</h3>

        {serverError && <p className="sign_in_error">{serverError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="sign_in__form">
          <div className="sign_in__form_field">
            <label className="sign_in__form_label">
              {t('login.email')}
              <input
                className={`sign_in__form_input${errors.email ? ' error' : ''}`}
                type="email"
                id="email"
                placeholder="yours@example.com"
                {...register('email', {
                  required: t('validation.blank') ?? '',
                  pattern: { value: emailRegEx, message: t('validation.email') ?? '' },
                })}
              />
            </label>
            {errors.email && <span className="sign_in__form_error">{errors.email.message}</span>}
          </div>
          <div className="sign_in__form_field">
            <label className="sign_in__form_label">
              {t('login.password')}
              <input
                className={`sign_in__form_input${errors.password ? ' error' : ''}`}
                type="password"
                id="password"
                placeholder={t('placeholder.password') ?? ''}
                {...register('password', {
                  required: t('validation.blank') ?? '',
                  minLength: {
                    value: 8,
                    message: t('validation.password_length') ?? '',
                  },
                  pattern: {
                    value: passwordRegEx,
                    message: t('validation.password_char') ?? '',
                  },
                })}
              />
            </label>
            {errors.password && (
              <span className="sign_in__form_error">{errors.password.message}</span>
            )}
          </div>
          <div className="sign_in__form_submit">
            {isSubmitting ? (
              <p className="sign_in_message">{t('login.status.load_sing_in')}</p>
            ) : (
              <button type="submit" className="sign_in__form_button">
                {t('button.sing_up')}
              </button>
            )}
          </div>
        </form>
        <p className="sign_in__text">
          {t('login.is_account')}
          <Link to={ROUTES.signIn} className="sign_in__text_link">
            {t('button.sing_in')}
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUpForm;
