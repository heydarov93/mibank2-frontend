import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductFormData } from 'models/IProductInfo';
import { SLICE_NAMES } from 'store/constants/sliceNames';

const initialState: ProductFormData = {
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
    setProductForm(state, action: PayloadAction<ProductFormData>) {
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
