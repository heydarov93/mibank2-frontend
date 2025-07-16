import { ReducersMapObject } from '@reduxjs/toolkit';

import AuthReducer from '../slices/auth/AuthSlice';
import CreateCardReducer from '../slices/cards/CreateCardSlice';
import ContactsReducer from '../slices/contacts/ContactsSlice';
import CreateDepositReducer from '../slices/deposits/CreateDepositSlice';
import ChooseProductReducer from '../slices/products/ChooseProductSlice';
import ProductStepperReducer from '../slices/products/ProductStepperSlice';

export const sliceReducers: ReducersMapObject = {
  auth: AuthReducer,
  contacts: ContactsReducer,
  productStepper: ProductStepperReducer,
  productForm: ChooseProductReducer,
  createDeposit: CreateDepositReducer,
  createCard: CreateCardReducer,
};
