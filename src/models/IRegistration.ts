export interface IPersonalInfo {
  name: string;
  surname: string;
  dateOfBirth: string;
  phoneNumber: number;
}

export interface ILegalStatus {
  // TODO: add these types when creating fields
  // citizenship: string;
  // taxResidence: string;
  peselNumber: number;
}

export interface IDocumentInfo {
  passportNumber: string;
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
