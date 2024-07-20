import { configureStore, combineReducers } from '@reduxjs/toolkit';

import AuthReducer from './reducers/AuthSlice';

import { authApi } from 'api/authApi';
import { userInfoApi } from 'api/userInfoApi';

const rootReducer = combineReducers({
  auth: AuthReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userInfoApi.reducerPath]: userInfoApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, userInfoApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
