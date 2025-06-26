import { localTokenHandler } from './tokenHandler';

import { ETokenType } from 'enums';

describe('tokenHandler', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to store the token in localStorage', () => {
    const token = 'test-token';

    localTokenHandler.storeToken(token, ETokenType.ACCESS);

    expect(localStorage.getItem(ETokenType.ACCESS)).toBe(token);
  });

  it('should be able to retrieve the token from localStorage', () => {
    const token = 'test-token';
    localStorage.setItem(ETokenType.ACCESS, token);

    expect(localTokenHandler.getToken(ETokenType.ACCESS)).toBe(token);
  });

  it('should return null if token does not exist', () => {

    expect(localTokenHandler.getToken(ETokenType.ACCESS)).toBeNull();
  });

  it('should be able to remove the token from localStorage', () => {
    const token = 'test-token';
    localStorage.setItem(ETokenType.ACCESS, token);

    localTokenHandler.clearToken(ETokenType.ACCESS);

    expect(localStorage.getItem(ETokenType.ACCESS)).toBeNull();
  });
});
