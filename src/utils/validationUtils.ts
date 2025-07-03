import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS
} from 'constants/validationPatternConstants';

export const removeSpaces = (value: string) => value?.replace(/\s+/g, '') || '';
export const isValidVerificationCodeLength = (value: string) =>
  value?.toString().length === VALIDATION_LIMITS.VERIFICATION_CODE_LENGTH;

export const hasOnlyOneCapitalLetter = (value: string): boolean => {
  if (!value) return true;
  return !VALIDATION_PATTERNS.ONLY_ONE_CAPITALIZE_LETTER.test(value);
};
export const isValidDecimalAmount = (
  value: number | undefined,
  pattern: RegExp,
): boolean => value === undefined || pattern.test(value.toString());

export const isValidPhoneLength = (value: string) =>
  value.toString().length >= VALIDATION_LIMITS.PHONE_TEST_LENGTH;
export const isValidPeselLength = (value: string) =>
  value.toString().length === VALIDATION_LIMITS.PESEL_TEST_LENGTH;

export const isPositiveNumber = (value: string | undefined): boolean =>
  value !== undefined && parseFloat(value) > 0;

export const isMinimumValue = (
  value: string | undefined,
  minimum: number,
): boolean => value !== undefined && parseFloat(value) >= minimum;

export const isNonNegative = (value: string | undefined): boolean =>
  value !== undefined && parseFloat(value) >= 0;

export const isPositiveInteger = (value: string | undefined): boolean =>
  value !== undefined && parseInt(value) > 0;

export const isNonNegativeInteger = (value: string | undefined): boolean =>
  value !== undefined && parseInt(value) >= 0;

export const isMinimumInteger = (
  value: string | undefined,
  minimum: number,
): boolean => value !== undefined && parseInt(value, 10) >= minimum;
