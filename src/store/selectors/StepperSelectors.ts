import { RootState } from 'store';

export const getStep = (state: RootState) => state.stepper.step;
