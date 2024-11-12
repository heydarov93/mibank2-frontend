export interface IPersonalInfo {
  name: string;
  surname: string;
  dateOfBirth: string;
  phoneNumber: number;
}

export interface ILegalStatus {
  citizenship: string;
  taxResidenceCountry: string;
  peselNumber: number;
}

export interface IDocumentInfo {
  passportNumber: string;
  issueDate: string;
  expirationDate: string;
}

export interface IAddress {
  city: string;
  // TODO: uncomment when fields are created
  // street: string;
  // building: number;
  // apartment: number;
  // postcode: number;
}
