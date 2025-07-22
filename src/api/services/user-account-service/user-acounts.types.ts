import { USER_ACCOUNT_TAGS } from 'api/constants/tags';

export interface IConfirmForgotPasswordRequest {
  email: string | null;
  code: string;
  newPassword: string;
}

export interface ILegalEntityValidationRequest {
  companyName: string;
  nip: string;
  companyEmail: string;
}
export interface ILegalEntitySignUpRequest {
  companyName: string;
  nip: string;
  companyEmail: string;
  ownerFullName: string;
  password: string;
}

export type TUserAccountTag =
  (typeof USER_ACCOUNT_TAGS)[keyof typeof USER_ACCOUNT_TAGS];
