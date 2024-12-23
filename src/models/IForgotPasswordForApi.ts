export interface IForgotPasswordForApi {
  email: string | null;
  code: string;
  newPassword: string;
}
