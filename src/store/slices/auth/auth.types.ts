import { IUserInfo } from 'models/IUserInfo';

export interface IAuthState {
  isVerifying: boolean;
  email: string;
  verifyingTimer: number;
  user: IUserInfo | undefined;
  error: string | null;
  loading: boolean;
  isAutoLogout: boolean;
}
