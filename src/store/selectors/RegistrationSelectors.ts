import { RootState } from 'store';

export const getLoading = (state: RootState) => state.registration.loading;
export const getPersonalInfoData = (state: RootState) =>
  state.registration.personalData;
export const getLegalStatusData = (state: RootState) =>
  state.registration.legalStatus;
export const getDocumentInfoData = (state: RootState) =>
  state.registration.documentInfo;
export const getEUDocumentInfoData = (state: RootState) =>
  state.registration.euDocumentInfo;
export const getAddressData = (state: RootState) => state.registration.address;
export const getPhoneCode = (state: RootState) => state.registration.phoneCode;
export const getDateRegistration = (state: RootState) =>
  state.registration.registrationDate;

export const errorMessage = (state: RootState) => state.registration.error;
