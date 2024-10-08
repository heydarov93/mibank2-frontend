import {
  setAuthData,
  removeAuthData,
  getAuthStatus,
  getEmail,
} from './storageAuthHandler';

describe('storageAuthHandler', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should store "isAuth" as "true" when isAuth is true', () => {
    setAuthData(true);
    expect(localStorage.getItem('isAuth')).toBe('true');
  });

  it('should store "isAuth" as "false" when isAuth is false', () => {
    setAuthData(false);
    expect(localStorage.getItem('isAuth')).toBe('false');
  });

  it('should store the email when provided', () => {
    const email = 'example@gmail.com';
    setAuthData(true, email);
    expect(localStorage.getItem('email')).toBe(email);
  });

  it('should not store the email when it is not provided', () => {
    setAuthData(true);
    expect(localStorage.getItem('email')).toBeNull();
  });

  it('should remove "isAuth" and "email" from localStorage', () => {
    localStorage.setItem('isAuth', 'true');
    localStorage.setItem('email', 'example@gmail.com');

    removeAuthData();

    expect(localStorage.getItem('isAuth')).toBeNull();
    expect(localStorage.getItem('email')).toBeNull();
  });

  it('should return true when "isAuth" is true in localStorage', () => {
    localStorage.setItem('isAuth', 'true');
    expect(getAuthStatus()).toBe(true);
  });

  it('should return false when "isAuth" is false in localStorage', () => {
    localStorage.setItem('isAuth', 'false');
    expect(getAuthStatus()).toBe(false);
  });

  it('should return the email when it exists in localStorage', () => {
    const email = 'example@gmail.com';
    localStorage.setItem('email', email);
    expect(getEmail()).toBe(email);
  });

  it('should return null when no email exists in localStorage', () => {
    localStorage.removeItem('email');
    expect(getEmail()).toBeNull();
  });
});
