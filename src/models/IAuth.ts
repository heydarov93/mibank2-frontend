import { JwtPayload } from 'jwt-decode';

import { ILegalEntity } from './ILegalEntity';
import { IUserInfo } from './IUser';

export interface ILoginData {
  email: string;
  password: string;
}
export interface IAuth {
  accessToken: string;
  refreshToken: string;
  temporaryToken: string;
}
export interface IAuthState {
  isVerifying: boolean;
  email: string;
  verifyingTimer: number;
  user: IUserInfo | undefined;
  legalEntity: ILegalEntity;
  error: string | null;
  loading: boolean;
  isAutoLogout: boolean;
}
export interface ILoginFormInput {
  email: string;
  password: string;
  checkbox?: boolean;
}
export interface ISignupFormInput {
  password: string;
  confirmPassword: string;
  checkbox?: boolean;
}
export interface IBusinessSignUpFormData {
  companyName: string;
  companyEmail: string;
  nip: string;
  ownerName: string;
}
export interface IEmailFormInput {
  email: string;
}
export interface IForgotPasswordFormInput {
  password: string;
  confirmPassword: string;
  verificationCode: string;
}
export interface IBackOfficeEmployeeLogin {
  email: string;
}
export interface IDecodedToken extends JwtPayload {
  sub: string;
  email?: string;
}
export interface IDecodeEmployeeToken extends JwtPayload {
  sub: string;
  role: string;
}
