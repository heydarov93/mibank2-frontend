import { RootState } from 'store';

export const getLoading = (state: RootState) => state.registration.loading;
export const getPersonalInfoData = (state: RootState) =>
  state.registration.personalData;
export const getLegalStatusData = (state: RootState) =>
  state.registration.legalStatus;
export const getDocumentInfoData = (state: RootState) =>
  state.registration.documentInfo;
export const getAddressData = (state: RootState) => state.registration.address;

export const errorMessage = (state: RootState) => state.registration.error;
