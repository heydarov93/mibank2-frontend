import { HTTP_HEADERS } from 'constants/security/httpHeaders';
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

export const clearAllTokens = (): void => {
  Object.values(ETokenType).forEach((tokenType: ETokenType) => {
    localTokenHandler.clearToken(tokenType);
    sessionTokenHandler.clearToken(tokenType);
  });
};
export const getTokenValues = () => {
  const localAccessToken = localTokenHandler.getToken(ETokenType.ACCESS);
  const sessionAccessToken = sessionTokenHandler.getToken(ETokenType.ACCESS);
  const temporaryToken = localTokenHandler.getToken(ETokenType.TEMPORARY);
  const accessToken = localAccessToken || sessionAccessToken;

  return {
    accessToken,
    temporaryToken,
  };
};

export const prepareAuthHeaders = (headers: Headers): Headers => {
  const { accessToken, temporaryToken } = getTokenValues();

  if (accessToken) {
    headers.set(HTTP_HEADERS.Authorization, `Bearer ${accessToken}`);
  }

  if (temporaryToken) {
    headers.set(HTTP_HEADERS.TemporaryToken, temporaryToken);
  }

  return headers;
};
