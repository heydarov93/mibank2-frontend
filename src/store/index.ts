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

import { accountsApi } from 'api/accountsApi';
import { authApi } from 'api/authApi';
import { authenticateEmployeeApi } from 'api/authenticateEmployeeApi';
import { checkEmailApi } from 'api/checkEmailApi';
import { confirmForgotPasswordApi } from 'api/confirmForgotPasswordApi';
import { contactInfoApi } from 'api/contactInfoApi';
import { convertCurrencyApi } from 'api/convertCurrencyApi';
import { createCardApi } from 'api/createCardApi';
import { createDepositApi, createUserDepositApi } from 'api/createDepositApi';
import { deleteDepositApi } from 'api/deleteDepositApi';
import { employeeControllerApi } from 'api/employeeController';
import { employeeLogInApi } from 'api/employeeLogInApi';
import { getCodeForForgotPasswordApi } from 'api/getCodeForForgotPasswordApi';
import { getDepositsApi } from 'api/getDepositsApi';
import { getExchangeRatesApi } from 'api/getExchangeRatesApi';
import { getOffersApi } from 'api/getOffersApi';
import { getPostcode } from 'api/getPostcode';
import { getProductsApi } from 'api/getProductsApi';
import { getUserIdApi } from 'api/getUserIdApi';
import { postRegistrationInfoApi } from 'api/postRegistrationInfoApi';
import { refreshToken } from 'api/refreshTokenApi';
import { registerEmployeeApi } from 'api/registerEmployee';
import { registerNewUserApi } from 'api/registerNewUserApi';
import { updateDepositApi } from 'api/updateDepositApi';
import { userInfoApi } from 'api/userInfoApi';
import { validateOtpApi } from 'api/validateOtpApi';

const rootReducer = combineReducers({
  auth: AuthReducer,
  contacts: BankContactReducer,
  productStepper: ProductStepperReducer,
  productForm: ChooseProductReducer,
  createDeposit: CreateDepositReducer,
  createCard: CreateCardReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userInfoApi.reducerPath]: userInfoApi.reducer,
  [contactInfoApi.reducerPath]: contactInfoApi.reducer,
  [checkEmailApi.reducerPath]: checkEmailApi.reducer,
  [getPostcode.reducerPath]: getPostcode.reducer,
  [registerNewUserApi.reducerPath]: registerNewUserApi.reducer,
  [postRegistrationInfoApi.reducerPath]: postRegistrationInfoApi.reducer,
  [getCodeForForgotPasswordApi.reducerPath]:
    getCodeForForgotPasswordApi.reducer,
  [confirmForgotPasswordApi.reducerPath]: confirmForgotPasswordApi.reducer,
  [refreshToken.reducerPath]: refreshToken.reducer,
  [authenticateEmployeeApi.reducerPath]: authenticateEmployeeApi.reducer,
  [employeeLogInApi.reducerPath]: employeeLogInApi.reducer,
  [validateOtpApi.reducerPath]: validateOtpApi.reducer,
  [employeeControllerApi.reducerPath]: employeeControllerApi.reducer,
  [registerEmployeeApi.reducerPath]: registerEmployeeApi.reducer,
  [createDepositApi.reducerPath]: createDepositApi.reducer,
  [createCardApi.reducerPath]: createCardApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [getUserIdApi.reducerPath]: getUserIdApi.reducer,
  [deleteDepositApi.reducerPath]: deleteDepositApi.reducer,
  [updateDepositApi.reducerPath]: updateDepositApi.reducer,
  [convertCurrencyApi.reducerPath]: convertCurrencyApi.reducer,
  [getExchangeRatesApi.reducerPath]: getExchangeRatesApi.reducer,
  [getProductsApi.reducerPath]: getProductsApi.reducer,
  [getOffersApi.reducerPath]: getOffersApi.reducer,
  [getDepositsApi.reducerPath]: getDepositsApi.reducer,
  [createUserDepositApi.reducerPath]: createUserDepositApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
  blacklist: [
    authApi.reducerPath,
    userInfoApi.reducerPath,
    getPostcode.reducerPath,
    contactInfoApi.reducerPath,
    checkEmailApi.reducerPath,
    registerNewUserApi.reducerPath,
    postRegistrationInfoApi.reducerPath,
    getCodeForForgotPasswordApi.reducerPath,
    confirmForgotPasswordApi.reducerPath,
    refreshToken.reducerPath,
    authenticateEmployeeApi.reducerPath,
    employeeLogInApi.reducerPath,
    validateOtpApi.reducerPath,
    employeeControllerApi.reducerPath,
    registerEmployeeApi.reducerPath,
    createDepositApi.reducerPath,
    getDepositsApi.reducerPath,
    createCardApi.reducerPath,
    accountsApi.reducerPath,
    getUserIdApi.reducerPath,
    deleteDepositApi.reducerPath,
    updateDepositApi.reducerPath,
    getExchangeRatesApi.reducerPath,
    convertCurrencyApi.reducerPath,
    getProductsApi.reducerPath,
    getOffersApi.reducerPath,
    createUserDepositApi.reducerPath,
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
      getPostcode.middleware,
      contactInfoApi.middleware,
      checkEmailApi.middleware,
      registerNewUserApi.middleware,
      postRegistrationInfoApi.middleware,
      getCodeForForgotPasswordApi.middleware,
      confirmForgotPasswordApi.middleware,
      refreshToken.middleware,
      authenticateEmployeeApi.middleware,
      employeeLogInApi.middleware,
      validateOtpApi.middleware,
      employeeControllerApi.middleware,
      registerEmployeeApi.middleware,
      createDepositApi.middleware,
      getDepositsApi.middleware,
      createCardApi.middleware,
      accountsApi.middleware,
      getUserIdApi.middleware,
      deleteDepositApi.middleware,
      updateDepositApi.middleware,
      getExchangeRatesApi.middleware,
      convertCurrencyApi.middleware,
      getProductsApi.middleware,
      getOffersApi.middleware,
      createUserDepositApi.middleware,
    ]),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
