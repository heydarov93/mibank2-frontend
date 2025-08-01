import { USER_ACCOUNT_TAGS } from 'constants/api/tags';

interface IPersonalInfo {
  firstName: string;
  lastName: string;
  taxResidenceCountry: string;
  citizenship: string;
  phoneNumber: string;
  phoneCode: string;
  pesel: string;
  birthDate: string;
}
interface IDocumentInfo {
  number: string;
  issueDate: string;
  expiryDate: string;
  documentType: string;
}
interface IAddress {
  city: string;
  street: string;
  building: string;
  apartment: string;
  postCode: string;
}
export interface IConfirmForgotPasswordRequest {
  email: string | null;
  code: string;
  newPassword: string;
}
export interface ILegalEntityValidationRequest {
  companyName: string;
  nip: string;
  companyEmail: string;
}
export interface ILegalEntitySignUpRequest {
  companyName: string;
  nip: string;
  companyEmail: string;
  ownerFullName: string;
  password: string;
}
export interface IRegistrationResponse {
  personalInfo: IPersonalInfo;
  address: IAddress;
  document: IDocumentInfo;
  registrationDate: string;
}

export type TUserAccountTag =
  (typeof USER_ACCOUNT_TAGS)[keyof typeof USER_ACCOUNT_TAGS];
