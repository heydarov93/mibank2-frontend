import { TokenType } from 'models/IAuth';

export const localTokenHandler = {
  storeToken: (token: string | null, tokenType: TokenType) =>
    token && localStorage.setItem(tokenType, token),
  getToken: (tokenType: TokenType) => localStorage.getItem(tokenType),
  clearToken: (tokenType: TokenType) => localStorage.removeItem(tokenType),
};
