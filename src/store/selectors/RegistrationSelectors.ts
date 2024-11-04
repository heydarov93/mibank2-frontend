import { RootState } from 'store';

export const getLoading = (state: RootState) => state.auth.loading;
export const setPersonalInfoData = (state: RootState) =>
  state.registration.personalData;
export const setLegalStatusData = (state: RootState) =>
  state.registration.legalStatus;
export const setDocumentInfoData = (state: RootState) =>
  state.registration.documentInfo;
export const setAddressData = (state: RootState) => state.registration.address;

export const errorMessage = (state: RootState) => state.auth.error;
