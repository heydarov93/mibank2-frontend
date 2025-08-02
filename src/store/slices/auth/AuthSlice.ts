import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState } from 'models/IAuth';
import { IUserInfo } from 'models/IUser';
import { SLICE_NAMES } from 'store/constants/sliceNames';

const initialState: IAuthState = {
  isVerifying: false,
  email: '',
  verifyingTimer: 0,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    status: '0',
    isBlocked: null,
  },
  legalEntity: {
    email: '',
    companyName: '',
    nip: '',
    ownerFullName: '',
  },
  error: null,
  loading: false,
  isAutoLogout: false,
};

const AuthSlice = createSlice({
  name: SLICE_NAMES.AUTH,
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setVerifying: (state, action) => {
      state.isVerifying = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setVerifyingTimer: (state, action) => {
      state.verifyingTimer = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUserData(state, action: PayloadAction<IUserInfo | undefined>) {
      state.user = action.payload;
    },
    logoutFromApp(state) {
      state.user = initialState.user;
      state.legalEntity = initialState.legalEntity;
    },
    setIsAutoLogout: (state, action) => {
      state.isAutoLogout = action.payload;
    },
    setLegalEntityInfo(
      state,
      action: PayloadAction<{
        companyEmail: string;
        companyName: string;
        nip: string;
        ownerName: string;
      }>,
    ) {
      const { companyEmail, companyName, nip, ownerName } = action.payload;
      state.legalEntity.email = companyEmail;
      state.legalEntity.companyName = companyName;
      state.legalEntity.nip = nip;
      state.legalEntity.ownerFullName = ownerName;
    },
  },
});

export const {
  setError,
  setVerifying,
  setEmail,
  setVerifyingTimer,
  clearError,
  setLoading,
  setUserData,
  logoutFromApp,
  setIsAutoLogout,
  setLegalEntityInfo,
} = AuthSlice.actions;

export default AuthSlice.reducer;
