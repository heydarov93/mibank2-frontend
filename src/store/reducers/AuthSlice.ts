import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signOut, signIn, fetchUserAttributes } from 'aws-amplify/auth';

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

//TODO: add logic for logoutFromApp
// export const logoutFromApp = createAsyncThunk(
//   'Auth/logoutFromApp',
//   async (_, thunkApi) => {
//     await signOut();
//   },
// );

// export const signInUser = createAsyncThunk(
//   'Auth/signIn',
//   async (
//     { username, password }: { username: string; password: string },
//     thunkApi,
//   ) => {
//     thunkApi.dispatch(setLoading(true));
//     try {
//       await signIn({ username, password });

//       const userAttributes = await fetchUserAttributes();

//       const user: IUser = {
//         sub: userAttributes.sub,
//         name: userAttributes.name,
//         family_name: userAttributes.family_name,
//         email: userAttributes.email,
//         failedLogins: userAttributes['custom:FailedLogins'],
//         lastFailedTime: userAttributes['custom:LastFailedTime'],
//       };

//       thunkApi.dispatch(setUser(user));
//       return user;
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : 'An unknown error occurred';
//       thunkApi.dispatch(setError(errorMessage));
//       throw error;
//     } finally {
//       thunkApi.dispatch(setLoading(false));
//     }
//   },
// );

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setLogIn: (state) => {
      state.isAuth = true;
    },
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
  setLogIn,
  setError,
  clearError,
  setLoading,
  setUserData,
  logoutFromApp,
  loginToApp,
} = AuthSlice.actions;
export default AuthSlice.reducer;
