import { jwtDecode, JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  sub: string;
  email?: string;
}

interface DecodeEmployeeToken {
  sub: string;
  role: string;
}

export const getEmailFromToken = (token: string): string | undefined => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.email || decodedToken.sub || '';
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getEmailRoleFromToken = (token: string) => {
  try {
    const { sub: email, role } = jwtDecode<DecodeEmployeeToken>(token);
    if (!email || !role) {
      throw new Error('No role or email provided');
    }
    return { email, role };
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'Invalid Token');
  }
};
