import { EValidationKey } from 'enums';

export const VALIDATION_PATTERNS = {
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!?@#$%^&*_+\-\\(\\)\\[\]{}><\\/\\|"'.,:;`=])[a-zA-Z0-9~!?@#$%^&*_+\-\\(\\)\\[\]{}><\\/\\|"'.,:;`=]{8,}$/,
  EMAIL:
    /^(?=(.{1,64}@))((?!\.)(?![A-Za-z0-9]*\.{2,})(?!^[!#$%&'"*+\-/=?^_`{|}~.]+?@)[A-Za-z0-9!#$%&'"*+\-/=?^_`{|}~.]+(?<![.])@)(?=(.{4,255}$))((?!-|_|\.)(?!.*[-_.]{2,})([A-Za-z0-9-_.]+\.)+[A-Za-z]{2,})$/,
  NAME: /^[A-Za-zА-Яа-яЁё\s-]+$/,
  FULL_POLISH_NAME:
    /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ'-]{2,}(?:\s+[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ'-]{2,})+$/,
  POSTCODE_MASK: /^(\d{2})(\d+)/,
  DIGITS_SPECIAL: /^[\d-]+$/,
  CAPITALIZE_LETTERS: /^[A-ZА-ЯЁ][a-zа-яё]*(?:[-\s][a-zа-яё]+)*$/,
  ONLY_ONE_CAPITALIZE_LETTER: /[A-ZА-ЯЁ].*[A-ZА-ЯЁ]/,
  STREET: /^[A-Za-zА-Яа-яЁё0-9 -]+$/g,
  DIGITS_ONLY: /^[0-9]+$/,
  COMPANY_NAME: /^[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ'.,\\/&()\\+\-\s]+$/,
  POLISH_NIP: /^PL-NIP-\d{10}$/,
  STREET_ADDRESS: /^[A-Za-z0-9\s\-.,]+$/,
  BUILDING_NUMBER: /^[A-Za-z0-9\s-]+$/,
  OFFICE_NUMBER: /^[A-Za-z0-9\s-]+$/,
  POLISH_POSTCODE: /^\d{2}-\d{3}$/,
  CAPITALIZE_FIRST_LETTER: /^[A-Z]/,
  DECIMAL_AMOUNT: /^\d{1,15}(\.\d{1,2})?$/,
  CAPITALIZE_WORD: /^[A-Z][a-z]*$/,
  DECIMAL_NUMBER: /^\d*\.?\d+$/,
  WHOLE_NUMBER: /^\d+$/,
  DECIMAL_TWO_PLACES: /^\d+(\.\d{1,2})?$/,
  AMOUNT_PATTERN: /^\d{1,10}(\.\d{1,2})?$/,
  LATIN_ONLY: /^[A-Za-z0-9 ]*$/,
  LATIN_ONLY_SPECIAL: /^(?!\s)[a-zA-Z0-9\s!@#$%^&*()]*$/g,
  DOCUMENT_NUMBER: /^[A-Z0-9]+$/,
  LEGAL_STATUS_INPUT: /^[a-zA-Z]+$/,
} as const;

export const VALIDATION_LIMITS = {
  EMAIL_MAX_LENGTH: 320,
  PASSWORD_MAX_LENGTH: 50,
  CONFIRM_PASSWORD_MAX_LENGTH: 50,
  VERIFICATION_CODE_LENGTH: 6,
  COMPANY_NAME_MAX_LENGTH: 100,
  OWNER_NAME_MAX_LENGTH: 100,
  STREET_MAX_LENGTH: 100,
  BULDING_MAX_LENGTH: 10,
  POSTCODE_LENGTH: 6,
  BUILDING_MAX_LENGTH: 50,
  OFFICE_MAX_LENGTH: 30,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 40,
  PRODUCT_NAME_MIN_LENGTH: 3,
  PRODUCT_NAME_MAX_LENGTH: 150,
  PRODUCT_DESCRIPTION_MIN_LENGTH: 10,
  PRODUCT_DESCRIPTION_MAX_LENGTH: 500,
  DEPOSIT_TERM_MIN: 1,
  CARD_NAME_MIN_LENGTH: 3,
  CARD_DESCRIPTION_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 150,
  PAYMENTNAME_MAX_LENGTH: 50,
  BUILDING_ADRESS_MAX_LENGTH: 10,
  APARTMENT_MAX_LENGTH: 10,
  DOCUMENT_NUMBER_MIN_LENGTH: 6,
  DOCUMENT_NUMBER_MAX_LENGTH: 20,
  PESEL_TEST_LENGTH: 11,
  FIRST_NAME_MAX_LENGTH: 40,
  LAST_NAME_MAX_LENGTH: 80,
  PHONE_TEST_LENGTH: 10,
} as const;

export const PASSWORD_VALIDATION_RULES = {
  [EValidationKey.MINIMUM_CHAR]: (v: string) => v.length >= 8,
  [EValidationKey.LATIN_LETTERS_ONLY]: (v: string) =>
    /^(?=.*[A-Za-z])[A-Za-z0-9~!?@#$%^&*_\-+()[\]{}<>/|\\"'.,:;`=]+$/.test(v),
  [EValidationKey.LETTER_IN_UPPERCASE]: (v: string) => /[A-Z]/.test(v),
  [EValidationKey.LETTER_IN_LOWERCASE]: (v: string) => /[a-z]/.test(v),
  [EValidationKey.ONE_DIGIT]: (v: string) => /\d/.test(v),
  [EValidationKey.SPECIAL_CHAR]: (v: string) =>
    /[~!?@#$%^&*_\-+()[\]{}<>/|\\"'.,:;`=]/.test(v),
} as const;

export const CARD_PATTERN = '#### #### #### ####';
export const IBAN_PATTERN = 'PL## #### #### #### #### #### ####';
export const NIP_PATTERN = 'PL-NIP-##########';
export const SPECIAL_CHARACTERS = `~ ! ? @ # $ % ^ & * _ - + ( ) [ ] { } > < / \\ | "" ' . , : ;`;