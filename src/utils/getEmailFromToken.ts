import { jwtDecode, JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  sub: string;
  email?: string;
}

export const getEmailFromToken = (token: string): string | undefined => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.email || decodedToken.sub || '';
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
