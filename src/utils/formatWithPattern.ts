/**
 * @param input string to be formatted
 * @param pattern string with pattern like `PL## #### #### #### #### #### ####`
 * @returns formatted value
 */
export function formatWithPattern(input: string, pattern: string) {
  const digits = input.replace(/\D/g, '').split('');
  let i = 0;
  return pattern.replace(/#/g, () => digits[i++] ?? '');
}
