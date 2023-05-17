import { AuthErrorCodes } from 'firebase/auth';

function isObjKey<T extends object>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj;
}

function getFirebaseErrorMessage(errorCode: string): string | null {
  const messages = {
    [AuthErrorCodes.EMAIL_EXISTS]: {
      en: 'The provided email is already in use by an existing user, please provide another email.',
    },
    [AuthErrorCodes.TOKEN_EXPIRED]: {
      en: 'Your ID token has expired, please try to log in again.',
    },
    [AuthErrorCodes.INTERNAL_ERROR]: {
      en: 'The Authentication server encountered an unexpected error while trying to process the request.',
    },
    [AuthErrorCodes.INVALID_EMAIL]: {
      en: 'The provided value for your email is invalid, please write a valid email address.',
    },
    [AuthErrorCodes.INVALID_PASSWORD]: {
      en: "The email and password you entered don't match",
    },
    [AuthErrorCodes.OPERATION_NOT_ALLOWED]: {
      en: 'This sign-in method is not available currently.',
    },
    [AuthErrorCodes.USER_DELETED]: {
      en: 'User not found, please check your information.',
    },
  };

  if (isObjKey(errorCode, messages)) {
    return messages[errorCode].en;
  }

  return null;
}

export default getFirebaseErrorMessage;
