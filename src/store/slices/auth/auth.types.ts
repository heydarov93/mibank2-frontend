import { ILegaLEntity } from 'models/ILegalEntity';
import { IUserInfo } from 'models/IUserInfo';

export interface IAuthState {
  isVerifying: boolean;
  email: string;
  verifyingTimer: number;
  user: IUserInfo | undefined;
  legalEntity?: ILegaLEntity | undefined;
  error: string | null;
  loading: boolean;
  isAutoLogout: boolean;
}
