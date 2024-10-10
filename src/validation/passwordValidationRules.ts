import { ValidationKey } from 'enums';

export const passwordValidationRules = {
  [ValidationKey.MINIMUM_CHAR]: (v: string) => v.length >= 8,
  [ValidationKey.LATIN_LETTERS_ONLY]: (v: string) =>
    /^(?=.*[A-Za-z])[A-Za-z0-9~!?@#$%^&*_\-+()[\]{}<>/|\\"'.,:;`=]+$/.test(v),
  [ValidationKey.ONE_DIGIT]: (v: string) => /\d/.test(v),
  [ValidationKey.LETTER_IN_UPPERCASE]: (v: string) => /[A-Z]/.test(v),
  [ValidationKey.LETTER_IN_LOWERCASE]: (v: string) => /[a-z]/.test(v),
  [ValidationKey.SPECIAL_CHAR]: (v: string) =>
    /[~!?@#$%^&*_\-+()[\]{}<>/|\\"'.,:;`=]/.test(v),
};
