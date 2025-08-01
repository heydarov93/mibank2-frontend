import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EProductFormStepper } from 'enums/EProductFormStepper';
import { IProductStep } from 'models/IProduct';
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
