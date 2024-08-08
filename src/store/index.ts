import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AuthReducer from './reducers/AuthSlice';
import BankContactReducer from './reducers/BankContactsSlice';

import { authApi } from 'api/authApi';
import { contactInfoApi } from 'api/contactInfoApi';
import { userInfoApi } from 'api/userInfoApi';

const rootReducer = combineReducers({
  auth: AuthReducer,
  contacts: BankContactReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userInfoApi.reducerPath]: userInfoApi.reducer,
  [contactInfoApi.reducerPath]: contactInfoApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
  blacklist: [
    authApi.reducerPath,
    userInfoApi.reducerPath,
    contactInfoApi.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      authApi.middleware,
      userInfoApi.middleware,
      contactInfoApi.middleware,
    ]),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
