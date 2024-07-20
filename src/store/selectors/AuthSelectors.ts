import { RootState } from 'store';

export const getUser = (state: RootState) => state.auth.user;
export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getLoading = (state: RootState) => state.auth.loading;

export const errorMessage = (state: RootState) => state.auth.error;
