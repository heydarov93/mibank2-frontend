import { convertSecondsToTime } from './convertSecondsToTime';

describe('convertSecondsToTime', () => {
  it('should return an empty string for 0 seconds', () => {
    expect(convertSecondsToTime(0)).toBe('');
  });

  it('should return an empty string for negative seconds', () => {
    expect(convertSecondsToTime(-1)).toBe('');
  });

  it('should return "00:05" for 5 seconds', () => {
    expect(convertSecondsToTime(5)).toBe('00:05');
  });

  it('should return "02:00" for 120 seconds', () => {
    expect(convertSecondsToTime(120)).toBe('02:00');
  });

  it('should return "01:05" for 65 seconds', () => {
    expect(convertSecondsToTime(65)).toBe('01:05');
  });
});
