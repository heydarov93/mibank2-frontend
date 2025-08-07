import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProductFormData } from 'models/IProduct';
import { SLICE_NAMES } from 'store/constants/sliceNames';

const initialState: IProductFormData = {
  productType: '',
  subtype: '',
  currency: '',
  name: '',
  description: '',
};

const ChooseProductSlice = createSlice({
  name: SLICE_NAMES.CHOOSE_PRODUCT,
  initialState,
  reducers: {
    setProductForm(state, action: PayloadAction<IProductFormData>) {
      state.productType = action.payload.productType;
      state.subtype = action.payload.subtype;
      state.currency = action.payload.currency;
      state.name = action.payload.name;
      state.description = action.payload.description;
    },
    resetProductForm() {
      return initialState;
    },
  },
});

export const { setProductForm, resetProductForm } = ChooseProductSlice.actions;

export default ChooseProductSlice.reducer;
