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

export const setEmployeeAuthData = (
  isAuth: boolean,
  email?: string,
  role?: string,
) => {
  sessionStorage.setItem('isEmployeeAuth', isAuth ? 'true' : 'false');
  if (email) {
    sessionStorage.setItem('employeeEmail', email);
  }
  if (role) {
    sessionStorage.setItem('employeeRole', role);
  }
};

export const getEmployeeAuthStatus = () => {
  return sessionStorage.getItem('isEmployeeAuth') === 'true';
};

export const getEmployeeEmail = () => {
  return sessionStorage.getItem('employeeEmail');
};

export const getEmployeeRole = () => {
  return sessionStorage.getItem('employeeRole');
};

export const removeEmployeeAuthData = () => {
  sessionStorage.removeItem('isEmployeeAuth');
  sessionStorage.removeItem('employeeEmail');
  sessionStorage.removeItem('employeeRole');
};
