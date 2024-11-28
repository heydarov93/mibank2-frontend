import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IPersonalInfo,
  ILegalStatus,
  IDocumentInfo,
  IEUDocumentInfo,
  IAddress,
} from 'models/IRegistration';

interface RegistrationSlice {
  personalData: IPersonalInfo | undefined;
  legalStatus: ILegalStatus | undefined;
  documentInfo: IDocumentInfo | undefined;
  euDocumentInfo: IEUDocumentInfo | undefined;
  address: IAddress | undefined;
  error: string | null;
  loading: boolean;
}

const initialState: RegistrationSlice = {
  personalData: {
    name: '',
    surname: '',
    dateOfBirth: '',
    phoneNumber: 0,
  },
  legalStatus: {
    citizenship: '',
    taxResidenceCountry: '',
    peselNumber: '',
  },
  documentInfo: {
    passportNumber: '',
    issueDate: '',
    expirationDate: '',
  },
  euDocumentInfo: {
    idCardNumber: '',
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
    setPersonalInfoData(
      state,
      action: PayloadAction<IPersonalInfo | undefined>,
    ) {
      state.personalData = action.payload;
    },
    setLegalStatusData(state, action: PayloadAction<ILegalStatus | undefined>) {
      state.legalStatus = action.payload;
    },
    setDocumentInfoData(
      state,
      action: PayloadAction<IDocumentInfo | undefined>,
    ) {
      state.documentInfo = action.payload;
    },
    setEUDocumentInfoData(
      state,
      action: PayloadAction<IEUDocumentInfo | undefined>,
    ) {
      state.euDocumentInfo = action.payload;
    },
    setAddressData(state, action: PayloadAction<IAddress | undefined>) {
      state.address = action.payload;
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
} = RegistrationSlice.actions;
export default RegistrationSlice.reducer;
