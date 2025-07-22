export const ACCOUNT_TAGS = {
  IBAN: 'IBANAccounts',
  CARD: 'CardAccounts',
  USER_BY_TOKEN: 'UserAccountsByToken',
  LINK_ACCOUNT: 'LinkAccountWithCard',
  CARD_ISSUANCE: 'CardIssuance',
  USER_CARD_ACCOUNT: 'UserCardAccounts',
  LIST: 'List',
} as const;

export const TRANSFER_TAGS = {
  IBAN: 'IBANTransfer',
  CARD: 'CardTransfer',
  FEE: 'TransferFee',
  LIST: 'LIST',
} as const;

export const CARD_TAGS = {
  USER_CARDS: 'UserCards',
  USER_CARD_DETAILS: 'UserCardDetails',
  CARD_STATUS: 'UserCardStatus',
  PRIMARY_PAYMENT_CARD: 'SetPrimaryPaymentCard',
  SEARCH_CARDS: 'SearchCards',
  CREATE_CARD: 'CreateCard',
  IBAN_ACCOUNTS: 'IBANAccounts',
  USER_ACCOUNTS_BY_TOKEN: 'UserAccountsByToken',
  LIST: 'LIST',
} as const;

export const CONTACT_TAGS = {
  CONTACTS: 'Contacts',
  CONTACT_VERSION: 'ContactVersion',
} as const;

export const DEPOSIT_TAGS = {
  DEPOSIT: 'Deposit',
  LIST: 'List',
} as const;

export const PRODUCT_TAGS = {
  PRODUCT: 'Product',
  LIST: 'List',
} as const;

export const USER_DEPOSIT_TAGS = {
  USER_DEPOSIT: 'UserDeposit',
  LIST: 'List',
} as const;

export const EMPLOYEE_TAGS = {
  AUTH: 'EmployeAuth',
  OTP: 'ValidateOTP',
  EMAIL: 'EmployeeEmail',
  EMPLOYEE: 'Employee',
  LIST: 'List',
} as const;

export const EXCHANGE_RATE_TAGS = {
  EXCHANGE_RATE: 'ExchangeRate',
} as const;

export const OFFER_TAGS = {
  OFFER: 'Offer',
  OFFER_IMAGE: 'OfferImage',
} as const;

export const USER_ACCOUNT_TAGS = {
  AUTH: 'Authorize',
  CODE: 'Code',
  EMAIL: 'Email',
  FORGOT_PASSWORD: 'ForgotPassword',
  POST_CODE: 'PostCode',
  USER_ID: 'UserId',
  USER_INFO: 'UserInfo',
  REFERSH_TOKEN: 'RefreshToken',
  REGISTRATION: 'Registration',
  LEGAL_ENTITY_VALIDATION: 'ValidateLegalEntity',
  LEGAL_ENTITY_SIGN_UP: 'SgnUpLegalEntity',
} as const;
