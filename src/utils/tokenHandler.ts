import { ETokenType } from 'enums';

export const localTokenHandler = {
  storeToken: (token: string | null, tokenType: ETokenType) =>
    token && localStorage.setItem(tokenType, token),
  getToken: (tokenType: ETokenType) => localStorage.getItem(tokenType),
  clearToken: (tokenType: ETokenType) => localStorage.removeItem(tokenType),
};

export const sessionTokenHandler = {
  storeToken: (token: string | null, tokenType: ETokenType) => {
    token && sessionStorage.setItem(tokenType, token);
  },
  getToken: (tokenType: ETokenType) => sessionStorage.getItem(tokenType),
  clearToken: (tokenType: ETokenType) => sessionStorage.removeItem(tokenType),
};
