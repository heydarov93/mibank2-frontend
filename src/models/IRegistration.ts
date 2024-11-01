export interface IPersonalInfo {
  name: string;
  surname: string;
  dateOfBirth: string;
  phoneNumber: number;
}

export interface ILegalStatus {
  citizenship: string;
  taxResidence: string;
  pesel: number;
}

export interface IDocumentInfo {
  passport: string;
  issueDate: string;
  expirationDate: string;
}

export interface IAddress {
  city: string;
  street: string;
  building: number;
  apartment: number;
  postcode: number;
}
