import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILegaLEntity } from 'models/ILegalEntity';
import { IUserInfo } from 'models/IUserInfo';

interface AuthState {
  isVerifying: boolean;
  email: string;
  verifyingTimer: number;
  user: IUserInfo | undefined;
  legalEntity: ILegaLEntity | undefined;
  error: string | null;
  loading: boolean;
  isAutoLogout: boolean;
}

const initialState: AuthState = {
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
    ownerName: '',
  },
  error: null,
  loading: false,
  isAutoLogout: false,
};

const AuthSlice = createSlice({
  name: 'Auth',
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
    },
    setIsAutoLogout: (state, action) => {
      state.isAutoLogout = action.payload;
    },
    setLegalEntityInfo(state, action) {
      if (!state.legalEntity) return state;
      state.legalEntity.email = action.payload.companyEmail;
      state.legalEntity.companyName = action.payload.companyName;
      state.legalEntity.nip = action.payload.nip;
      state.legalEntity.ownerName = action.payload.ownerName;
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
