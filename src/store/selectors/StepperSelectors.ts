import { RootState } from 'store';

export const getStep = (state: RootState) => state.stepper.step;
export const getEU = (state: RootState) => state.stepper.isEU;
