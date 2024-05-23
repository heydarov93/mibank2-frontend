import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signOut, signIn, fetchUserAttributes } from 'aws-amplify/auth';

import { IUser } from 'models/IAuth';

interface AuthState {
  isAuth: boolean;
  user: IUser | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  error: null,
  loading: false,
};

export const logoutFromApp = createAsyncThunk(
  'Auth/logoutFromApp',
  async (_, thunkApi) => {
    await signOut();
  },
);

export const signInUser = createAsyncThunk(
  'Auth/signIn',
  async (
    { username, password }: { username: string; password: string },
    thunkApi,
  ) => {
    thunkApi.dispatch(setLoading(true));
    try {
      await signIn({ username, password });

      const userAttributes = await fetchUserAttributes();

      const user: IUser = {
        sub: userAttributes.sub,
        name: userAttributes.name,
        family_name: userAttributes.family_name,
        email: userAttributes.email,
        failedLogins: userAttributes['custom:FailedLogins'],
        lastFailedTime: userAttributes['custom:LastFailedTime'],
      };

      thunkApi.dispatch(setUser(user));
      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      thunkApi.dispatch(setError(errorMessage));
      throw error;
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  },
);

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(logoutFromApp.fulfilled, (state) => {
      state.user = null;
      state.isAuth = false;
    });
    builder.addCase(
      signInUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isAuth = true;
      },
    );
    builder.addCase(signInUser.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred';
    });
  },
});

export const { setUser, setError, clearError, setLoading } = AuthSlice.actions;
export default AuthSlice.reducer;
