export interface ILoginData {
  email: string;
  password: string;
}
export interface IAuth {
  accessToken: string;
  refreshToken: string;
  temporaryToken: string;
}
export interface IUser {
  sub: string | undefined;
  name: string | undefined;
  family_name: string | undefined;
  email: string | undefined;
  failedLogins: string | undefined;
  lastFailedTime: string | undefined;
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

export interface IEmailFormInput {
  email: string;
}

export enum TokenType {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
  TEMPORARY = 'temporaryToken',
}
