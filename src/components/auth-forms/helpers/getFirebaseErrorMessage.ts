import { AuthErrorCodes } from 'firebase/auth';

function isObjKey<T extends object>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj;
}

function getFirebaseErrorMessage(errorCode: string): string | null {
  const messages = {
    [AuthErrorCodes.EMAIL_EXISTS]: 'error.fire_base.email_exist',
    [AuthErrorCodes.TOKEN_EXPIRED]: 'error.fire_base.token_expired',
    [AuthErrorCodes.INTERNAL_ERROR]: 'error.fire_base.internal_error',
    [AuthErrorCodes.INVALID_EMAIL]: 'error.fire_base.invalid_email',
    [AuthErrorCodes.INVALID_PASSWORD]: 'error.fire_base.invalid_password',
    [AuthErrorCodes.OPERATION_NOT_ALLOWED]: 'error.fire_base.operation_not_allowed',
    [AuthErrorCodes.USER_DELETED]: 'error.fire_base.user_deleted',
  };

  if (isObjKey(errorCode, messages)) {
    return messages[errorCode];
  }

  return null;
}

export default getFirebaseErrorMessage;
