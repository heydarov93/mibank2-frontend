import {
  LOCAL_STORAGE_KEYS,
  SESSION_STORAGE_KEYS,
} from 'constants/security/storageAuthKeys';

export const setAuthData = (isAuth: boolean, email?: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.IsAuth, isAuth ? 'true' : 'false');
  if (email) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.Email, email);
  }
};

export const removeAuthData = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.IsAuth);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.Email);
};

export const getAuthStatus = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.IsAuth) === 'true';
};

export const getEmail = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.Email);
};

export const setEmployeeAuthData = (
  isAuth: boolean,
  email?: string,
  role?: string,
) => {
  sessionStorage.setItem(
    SESSION_STORAGE_KEYS.IsEmployeeAuth,
    isAuth ? 'true' : 'false',
  );
  if (email) {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.EmployeeEmail, email);
  }
  if (role) {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.EmployeeRole, role);
  }
};

export const getEmployeeAuthStatus = () => {
  return sessionStorage.getItem(SESSION_STORAGE_KEYS.IsEmployeeAuth) === 'true';
};

export const getEmployeeEmail = () => {
  return sessionStorage.getItem(SESSION_STORAGE_KEYS.EmployeeEmail);
};

export const getEmployeeRole = () => {
  return sessionStorage.getItem(SESSION_STORAGE_KEYS.EmployeeRole);
};

export const removeEmployeeAuthData = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.IsEmployeeAuth);
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.EmployeeEmail);
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.EmployeeRole);
};
