import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EStepper } from 'enums/EStepper';
interface Step {
  step: EStepper;
}
const initialState: Step = {
  step: EStepper.PERSONAL_INFO,
};

const StepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<EStepper>) {
      state.step = action.payload;
    },
  },
});

export const { setStep } = StepperSlice.actions;
export default StepperSlice.reducer;
