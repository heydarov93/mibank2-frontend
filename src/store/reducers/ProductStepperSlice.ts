import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EProductFormStepper } from 'enums/EProductFormStepper';

interface ProductStep {
  step: EProductFormStepper;
}

const initialState: ProductStep = {
  step: EProductFormStepper.PRODUCT_INFO,
};

const ProductStepperSlice = createSlice({
  name: 'productStepper',
  initialState,
  reducers: {
    setProductStep(state, action: PayloadAction<EProductFormStepper>) {
      state.step = action.payload;
    },
  },
});

export const { setProductStep } = ProductStepperSlice.actions;
export default ProductStepperSlice.reducer;
