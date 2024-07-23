import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserInfo } from 'models/IUserInfo';

interface AuthState {
  isAuth: boolean;
  user: IUserInfo | undefined;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuth: false,
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
    clearError(state) {
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUserData(state, action: PayloadAction<IUserInfo | undefined>) {
      state.user = action.payload;
    },
    loginToApp(state, action: PayloadAction<string>) {
      state.user ? (state.user.email = action.payload) : state.user;
    },
    logoutFromApp(state) {
      state.user = initialState.user;
    },
  },
});

export const {
  setError,
  clearError,
  setLoading,
  setUserData,
  logoutFromApp,
  loginToApp,
} = AuthSlice.actions;
export default AuthSlice.reducer;
