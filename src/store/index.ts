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
import ChooseProductReducer from './reducers/ChooseProductSlice';
import CreateCardReducer from './reducers/CreateCardSlice';
import CreateDepositReducer from './reducers/CreateDepositSlice';
import ProductStepperReducer from './reducers/ProductStepperSlice';

import {
  accountsApi,
  cardsApi,
  contactsApi,
  depositsApi,
  employeesApi,
  exchangeRatesApi,
  getUserIdApi,
  offersApi,
  productsApi,
  transfersApi,
  userAccountsApi,
  userDepositsApi,
} from 'api';

const rootReducer = combineReducers({
  auth: AuthReducer,
  contacts: BankContactReducer,
  productStepper: ProductStepperReducer,
  productForm: ChooseProductReducer,
  createDeposit: CreateDepositReducer,
  createCard: CreateCardReducer,
  [userAccountsApi.reducerPath]: userAccountsApi.reducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [depositsApi.reducerPath]: depositsApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [transfersApi.reducerPath]: transfersApi.reducer,
  [getUserIdApi.reducerPath]: getUserIdApi.reducer,
  [exchangeRatesApi.reducerPath]: exchangeRatesApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [offersApi.reducerPath]: offersApi.reducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
  [userDepositsApi.reducerPath]: userDepositsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
  blacklist: [
    userAccountsApi.reducerPath,
    contactsApi.reducerPath,
    employeesApi.reducerPath,
    depositsApi.reducerPath,
    accountsApi.reducerPath,
    transfersApi.reducerPath,
    getUserIdApi.reducerPath,
    exchangeRatesApi.reducerPath,
    productsApi.reducerPath,
    offersApi.reducerPath,
    accountsApi.reducerPath,
    cardsApi.reducerPath,
    userDepositsApi.reducerPath,
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
      userAccountsApi.middleware,
      contactsApi.middleware,
      employeesApi.middleware,
      depositsApi.middleware,
      accountsApi.middleware,
      transfersApi.middleware,
      getUserIdApi.middleware,
      exchangeRatesApi.middleware,
      productsApi.middleware,
      offersApi.middleware,
      accountsApi.middleware,
      cardsApi.middleware,
      userDepositsApi.middleware,
    ]),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
