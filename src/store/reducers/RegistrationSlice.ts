import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IPersonalInfo,
  ILegalStatus,
  IDocumentInfo,
  IEUDocumentInfo,
  IAddress,
} from 'models/IRegistration';

interface RegistrationSlice {
  personalData: IPersonalInfo;
  legalStatus: ILegalStatus;
  documentInfo: IDocumentInfo;
  euDocumentInfo: IEUDocumentInfo;
  address: IAddress;
  phoneCode: string;
  registrationDate: string;
  error: string | null;
  loading: boolean;
}

const initialState: RegistrationSlice = {
  personalData: {
    name: '',
    surname: '',
    dateOfBirth: '',
    phoneNumber: '',
  },
  legalStatus: {
    citizenship: '',
    taxResidenceCountry: '',
    peselNumber: '',
  },
  documentInfo: {
    documentNumber: '',
    issueDate: '',
    expirationDate: '',
  },
  euDocumentInfo: {
    documentNumber: '',
    issueDate: '',
    expirationDate: '',
  },
  address: {
    city: '',
    street: '',
    building: '',
    apartment: '',
    postcode: '',
  },
  registrationDate: '',
  phoneCode: '',
  error: null,
  loading: false,
};

const RegistrationSlice = createSlice({
  name: 'Registration',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPersonalInfoData(state, action: PayloadAction<IPersonalInfo>) {
      state.personalData = action.payload;
    },
    setLegalStatusData(state, action: PayloadAction<ILegalStatus>) {
      state.legalStatus = action.payload;
    },
    setDocumentInfoData(state, action: PayloadAction<IDocumentInfo>) {
      state.documentInfo = action.payload;
    },
    setEUDocumentInfoData(state, action: PayloadAction<IEUDocumentInfo>) {
      state.euDocumentInfo = action.payload;
    },
    setAddressData(state, action: PayloadAction<IAddress>) {
      state.address = action.payload;
    },
    setPhoneCode(state, action) {
      state.phoneCode = action.payload;
    },
    setDateRegistration(state, action) {
      state.registrationDate = action.payload;
    },
  },
});

export const {
  setError,
  clearError,
  setLoading,
  setPersonalInfoData,
  setLegalStatusData,
  setDocumentInfoData,
  setEUDocumentInfoData,
  setAddressData,
  setPhoneCode,
  setDateRegistration,
} = RegistrationSlice.actions;
export default RegistrationSlice.reducer;
