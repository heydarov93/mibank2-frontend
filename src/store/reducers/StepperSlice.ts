import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EStepper } from 'enums/EStepper';
interface Step {
  step: EStepper;
  isEU: boolean;
}
const initialState: Step = {
  step: EStepper.PERSONAL_INFO,
  isEU: false,
};

const StepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<EStepper>) {
      state.step = action.payload;
    },
    setEU(state, action: PayloadAction<boolean>) {
      state.isEU = action.payload;
    },
  },
});

export const { setStep, setEU } = StepperSlice.actions;
export default StepperSlice.reducer;
