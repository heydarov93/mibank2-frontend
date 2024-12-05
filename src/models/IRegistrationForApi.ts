export interface IRegistrationForApi {
  personalInfo: IPersonalInfo;
  address: IAddress;
  document: IDocumentInfo;
  registrationDate: string;
  email: string;
  accessToken: string;
}

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
