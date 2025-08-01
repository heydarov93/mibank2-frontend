import { jwtDecode } from 'jwt-decode';

import { IDecodedToken, IDecodeEmployeeToken } from 'models/IAuth';

export const getEmailFromToken = (token: string): string | undefined => {
  try {
    const { email, sub } = jwtDecode<IDecodedToken>(token);

    if (!email || !sub) {
      throw new Error('No email provided');
    }

    return email || sub || '';
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getEmailRoleFromToken = (token: string) => {
  try {
    const { sub: email, role } = jwtDecode<IDecodeEmployeeToken>(token);

    if (!email || !role) {
      throw new Error('No role or email provided');
    }

    return { email, role };
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'Invalid Token');
  }
};
