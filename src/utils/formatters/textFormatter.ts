export function formatWithPattern(input: string, pattern: string) {
  const digits = input.replace(/\D/g, '').split('');
  let i = 0;
  return pattern.replace(/#/g, () => digits[i++] ?? '');
}
