import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductFormData } from 'models/IProductInfo';

const initialState: ProductFormData = {
  product: '',
  type: '',
  currency: '',
  name: '',
  description: '',
};

const ChooseProductSlice = createSlice({
  name: 'chooseProductSlice',
  initialState,
  reducers: {
    setProductForm(state, action: PayloadAction<ProductFormData>) {
      state.product = action.payload.product;
      state.type = action.payload.type;
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
