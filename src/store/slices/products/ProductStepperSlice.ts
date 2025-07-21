import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProductStep } from './products.types';

import { EProductFormStepper } from 'enums/EProductFormStepper';
import { SLICE_NAMES } from 'store/constants/sliceNames';

const initialState: IProductStep = {
  step: EProductFormStepper.PRODUCT_INFO,
};

const ProductStepperSlice = createSlice({
  name: SLICE_NAMES.PRODUCT_STEPPER,
  initialState,
  reducers: {
    setProductStep(state, action: PayloadAction<EProductFormStepper>) {
      state.step = action.payload;
    },
    resetProductStep() {
      return initialState;
    },
  },
});

export const { setProductStep, resetProductStep } = ProductStepperSlice.actions;
export default ProductStepperSlice.reducer;
