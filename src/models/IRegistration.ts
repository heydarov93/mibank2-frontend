export interface IPersonalInfo {
  name: string;
  surname: string;
  dateOfBirth: string;
  phoneNumber: number;
}

export interface ILegalStatus {
  citizenship: string;
  taxResidenceCountry: string;
  peselNumber: string;
}

export interface IDocumentInfo {
  passportNumber: string;
  issueDate: string;
  expirationDate: string;
}

export interface IEUDocumentInfo {
  idCardNumber: string;
  issueDate: string;
  expirationDate: string;
}

export interface IAddress {
  city: string;
  street: string;
  building: string;
  apartment: string;
  postcode: string;
}
