import { USER_ACCOUNT_TAGS } from "constants/api/tags";

export interface IConfirmForgotPasswordRequest {
  email: string | null;
  code: string;
  newPassword: string;
}

export type TUserAccountTag =
  (typeof USER_ACCOUNT_TAGS)[keyof typeof USER_ACCOUNT_TAGS];
