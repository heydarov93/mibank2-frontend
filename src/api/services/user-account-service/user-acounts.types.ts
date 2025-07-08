export interface IConfirmForgotPasswordRequest {
  email: string | null;
  code: string;
  newPassword: string;
}
