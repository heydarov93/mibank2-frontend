import { TokenType } from 'models/IAuth';

export const localTokenHandler = {
  storeToken: (token: string | null, tokenType: TokenType) =>
    token && localStorage.setItem(tokenType, token),
  getToken: (tokenType: TokenType) => localStorage.getItem(tokenType),
  clearToken: (tokenType: TokenType) => localStorage.removeItem(tokenType),
};

export const sessionTokenHandler = {
  storeToken: (token: string | null, tokenType: TokenType) => {
    token && sessionStorage.setItem(tokenType, token);
  },
  getToken: (tokenType: TokenType) => sessionStorage.getItem(tokenType),
  clearToken: (tokenType: TokenType) => sessionStorage.removeItem(tokenType),
};