import { HTTP_STATUS } from 'constants/business/httpStatus';
import { SORT_ORDER } from 'constants/business/sortOrder';
import { TRANSFER_METHODS } from 'constants/business/transfers';
import { HTTP_HEADERS } from 'constants/security/httpHeaders';
import { FLAG_ICONS } from 'constants/ui/content';
import { LOGO_SIZES } from 'constants/ui/layout';
import { OTP_INPUT_KEY } from 'constants/validation/otp';
import { IDropdownOption } from 'models/ISelectField';
import { IUserBankCard } from 'models/IUser';

export type THttpHeaderKey = (typeof HTTP_HEADERS)[keyof typeof HTTP_HEADERS];
export type TOtpInputKey = (typeof OTP_INPUT_KEY)[keyof typeof OTP_INPUT_KEY];
export type TSortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
export type THttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
export type TTransferMethod = (typeof TRANSFER_METHODS)[number];
export type TLogoSize = keyof typeof LOGO_SIZES;
export type TCurrency = keyof typeof FLAG_ICONS;
export type TLogoSvgColor = 'blue' | 'white';
export type TCardIssuer = 'visa' | 'mastercard' | 'unionpay';
export type TCardStatus = 'active' | 'blocked' | 'expired';
export type TCardIssueType = 'digital' | 'plastic';
export type TCardType = 'debit' | 'credit';
export type TTransactionType = 'income' | 'expense';
export type TSubmissionState = 'idle' | 'success' | 'error';
export type TId = string | number;
export type TBaseSelectOption = Required<IDropdownOption>;
export type TUserBankCardDetails = Pick<
  IUserBankCard,
  | 'id'
  | 'holder'
  | 'number'
  | 'cvv'
  | 'iban'
  | 'swift'
  | 'issueDate'
  | 'cashbackRate'
  | 'status'
  | 'isPrimary'
>;
export type TVoivodeship =
  | 'Lower Silesian'
  | 'Kuyavian-Pomeranian'
  | 'Lesser Poland'
  | 'Greater Poland'
  | 'Łódź'
  | 'Lublin'
  | 'Lubusz'
  | 'Masovian'
  | 'Opole'
  | 'Podkarpackie'
  | 'Podlaskie'
  | 'Pomeranian'
  | 'Silesian'
  | 'Świętokrzyskie'
  | 'Warmian-Masurian'
  | 'West Pomeranian';
