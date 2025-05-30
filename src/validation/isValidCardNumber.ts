// https://github.com/bendrucker/fast-luhn/blob/master/index.js
const lookup = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

export function isValidCardNumber(number: string) {
  if (typeof number !== 'string') throw new TypeError('Expected string input');
  if (!number) return false;

  let index = number.length;
  if (index !== 16) return false;

  let x2 = true;
  let sum = 0;

  while (index) {
    const value = number.charCodeAt(--index) - 48;
    if (value < 0 || value > 9) return false;

    x2 = !x2;
    sum += x2 ? lookup[value] : value;
  }

  return sum % 10 === 0;
}
