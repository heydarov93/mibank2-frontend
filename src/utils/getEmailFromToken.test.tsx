import { jwtDecode } from 'jwt-decode';

import { getEmailFromToken } from './getEmailFromToken';

jest.mock('jwt-decode');

describe('getEmailFromToken', () => {
  it('should return the email from the token correctly', () => {
    const mockToken = 'mockToken';
    const mockDecodedToken = { sub: '123', email: 'user@example.com' };
    (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);

    expect(getEmailFromToken(mockToken)).toBe('user@example.com');
  });

  it('should return the sub value if email is not present', () => {
    const mockToken = 'mockToken';
    const mockDecodedToken = { sub: '123', email: undefined };
    (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);

    expect(getEmailFromToken(mockToken)).toBe('123');
  });

  it('should return an empty string if neither email nor sub are present', () => {
    const mockToken = 'mockToken';
    const mockDecodedToken = { email: undefined, sub: undefined };
    (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);

    expect(getEmailFromToken(mockToken)).toBe('');
  });

  it('should handle errors correctly', () => {
    const mockToken = 'mockToken';
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() => getEmailFromToken(mockToken)).toThrow('Invalid token');
  });
});
