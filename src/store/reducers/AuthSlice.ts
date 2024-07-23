import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserInfo } from 'models/IUserInfo';

interface AuthState {
  isVerifying: boolean;
  user: IUserInfo | undefined;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isVerifying: false,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    status: '0',
    isBlocked: null,
  },
  error: null,
  loading: false,
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
  },
});

export const {
  setError,
  setVerifying,
  clearError,
  setLoading,
  setUserData,
  logoutFromApp,
} = AuthSlice.actions;
export default AuthSlice.reducer;
