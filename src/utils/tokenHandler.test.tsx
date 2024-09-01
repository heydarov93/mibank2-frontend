import { localTokenHandler } from './tokenHandler';

import { TokenType } from 'models/IAuth';

describe('tokenHandler', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to store the token in localStorage', () => {
    const token = 'test-token';
    const tokenType = TokenType.ACCESS;

    localTokenHandler.storeToken(token, tokenType);

    expect(localStorage.getItem(tokenType)).toBe(token);
  });

  it('should be able to retrieve the token from localStorage', () => {
    const token = 'test-token';
    const tokenType = TokenType.ACCESS;
    localStorage.setItem(tokenType, token);

    expect(localTokenHandler.getToken(tokenType)).toBe(token);
  });

  it('should return null if token does not exist', () => {
    const tokenType = TokenType.ACCESS;

    expect(localTokenHandler.getToken(tokenType)).toBeNull();
  });

  it('should be able to remove the token from localStorage', () => {
    const token = 'test-token';
    const tokenType = TokenType.ACCESS;
    localStorage.setItem(tokenType, token);

    localTokenHandler.clearToken(tokenType);

    expect(localStorage.getItem(tokenType)).toBeNull();
  });
});
