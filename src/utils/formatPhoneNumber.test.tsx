import { formatPhoneNumber } from './formatPhoneNumber';

describe('formatPhoneNumber', () => {
  it('should format the phone number correctly', () => {
    expect(formatPhoneNumber('12345678912')).toBe('(+12) 345 678 912');
  });

  it('should remove non-digit characters', () => {
    expect(formatPhoneNumber('12-34_56+789/12 abc ')).toBe('(+12) 345 678 912');
  });
});
