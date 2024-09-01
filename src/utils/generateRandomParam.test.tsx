import { generateRandomParam } from './generateRandomParam';

describe('generateRandomParam', () => {
  it('should not return an empty string', () => {
    expect(generateRandomParam()).not.toBe('');
  });

  it('should start with a "?"', () => {
    expect(generateRandomParam()).toMatch(/^\?[a-z0-9]+$/);
  });
});
