export const setAuthData = (isAuth: boolean, email?: string) => {
  localStorage.setItem('isAuth', isAuth ? 'true' : 'false');
  if (email) {
    localStorage.setItem('email', email);
  }
};

export const removeAuthData = () => {
  localStorage.removeItem('isAuth');
  localStorage.removeItem('email');
};

export const getAuthStatus = () => {
  return localStorage.getItem('isAuth') === 'true';
};

export const getEmail = () => {
  return localStorage.getItem('email');
};
