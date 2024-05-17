import {createSelector} from '@reduxjs/toolkit';

import { RootState } from 'store/store';

export const getUser = (state: RootState) => state.auth.user;
export const setLoading = (state: RootState) => state.auth.loading;

export const errorMessage = (state: RootState) => state.auth.error;