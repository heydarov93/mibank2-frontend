import { RootState } from 'store';

export const getUser = (state: RootState) => state.auth.user;
export const getLoading = (state: RootState) => state.auth.loading;
export const getVerifyingTimer = (state: RootState) =>
  state.auth.verifyingTimer;

export const errorMessage = (state: RootState) => state.auth.error;
