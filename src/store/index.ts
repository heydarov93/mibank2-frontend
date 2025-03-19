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
import RegistrationReducer from './reducers/RegistrationSlice';
import StepperReducer from './reducers/StepperSlice';

import { authApi } from 'api/authApi';
import { authenticateEmployeeApi } from 'api/authenticateEmployeeApi';
import { checkEmailApi } from 'api/checkEmailApi';
import { confirmForgotPasswordApi } from 'api/confirmForgotPasswordApi';
import { contactInfoApi } from 'api/contactInfoApi';
import { createCardApi } from 'api/createCardApi';
import { createDepositApi } from 'api/createDeposit';
import { deleteDepositApi } from 'api/deleteDepositApi';
import { employeeControllerApi } from 'api/employeeController';
import { getCodeForForgotPasswordApi } from 'api/getCodeForForgotPasswordApi';
import { getDepositsApi } from 'api/getDepositsApi';
import { getExchangeRatesApi } from 'api/getExchangeRatesApi';
import { getPostcode } from 'api/getPostcode';
import { postRegistrationInfoApi } from 'api/postRegistrationInfoApi';
import { refreshToken } from 'api/refreshTokenApi';
import { registerEmployeeApi } from 'api/registerEmployee';
import { registerNewUserApi } from 'api/registerNewUserApi';
import { userInfoApi } from 'api/userInfoApi';
import { validateOtpApi } from 'api/validateOtpApi';
import registrationDataMiddleware from 'middleware/dateFormatterMiddleware';

const rootReducer = combineReducers({
  auth: AuthReducer,
  contacts: BankContactReducer,
  registration: RegistrationReducer,
  stepper: StepperReducer,
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
  [validateOtpApi.reducerPath]: validateOtpApi.reducer,
  [employeeControllerApi.reducerPath]: employeeControllerApi.reducer,
  [registerEmployeeApi.reducerPath]: registerEmployeeApi.reducer,
  [getExchangeRatesApi.reducerPath]: getExchangeRatesApi.reducer,
  [createDepositApi.reducerPath]: createDepositApi.reducer,
  [getDepositsApi.reducerPath]: getDepositsApi.reducer,
  [createCardApi.reducerPath]: createCardApi.reducer,
  [deleteDepositApi.reducerPath]: deleteDepositApi.reducer,
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
    validateOtpApi.reducerPath,
    employeeControllerApi.reducerPath,
    registerEmployeeApi.reducerPath,
    getExchangeRatesApi.reducerPath,
    createDepositApi.reducerPath,
    getDepositsApi.reducerPath,
    createCardApi.reducerPath,
    deleteDepositApi.reducerPath,
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
      registrationDataMiddleware,
      getCodeForForgotPasswordApi.middleware,
      confirmForgotPasswordApi.middleware,
      refreshToken.middleware,
      authenticateEmployeeApi.middleware,
      validateOtpApi.middleware,
      employeeControllerApi.middleware,
      registerEmployeeApi.middleware,
      getExchangeRatesApi.middleware,
      createDepositApi.middleware,
      getDepositsApi.middleware,
      createCardApi.middleware,
      deleteDepositApi.middleware,
    ]),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
