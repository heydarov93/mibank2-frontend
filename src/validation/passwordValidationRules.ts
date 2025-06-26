import { EValidationKey } from 'enums';

export const passwordValidationRules = {
  [EValidationKey.MINIMUM_CHAR]: (v: string) => v.length >= 8,
  [EValidationKey.LATIN_LETTERS_ONLY]: (v: string) =>
    /^(?=.*[A-Za-z])[A-Za-z0-9~!?@#$%^&*_\-+()[\]{}<>/|\\"'.,:;`=]+$/.test(v),
  [EValidationKey.LETTER_IN_UPPERCASE]: (v: string) => /[A-Z]/.test(v),
  [EValidationKey.LETTER_IN_LOWERCASE]: (v: string) => /[a-z]/.test(v),
  [EValidationKey.ONE_DIGIT]: (v: string) => /\d/.test(v),
  [EValidationKey.SPECIAL_CHAR]: (v: string) =>
    /[~!?@#$%^&*_\-+()[\]{}<>/|\\"'.,:;`=]/.test(v),
};
