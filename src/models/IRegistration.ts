export interface IPersonalInfo {
  name: string;
  surname: string;
  dateOfBirth: string;
  phoneNumber: string;
  phoneCode: string;
}

export interface ILegalStatus {
  citizenship: string;
  taxResidenceCountry: string;
  peselNumber: string;
}

export interface IDocumentInfo {
  documentNumber: string;
  issueDate: string;
  expirationDate: string;
}

export interface IEUDocumentInfo {
  documentNumber: string;
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

export interface ILegalAddress {
  country: string;
  city: string;
  street: string;
  building: string;
  office: string;
  postcode: string;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export interface FormStepProps {
  onBack: () => void;
}
