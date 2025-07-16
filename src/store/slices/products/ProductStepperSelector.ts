import { RootState } from 'store';

export const getProductStep = (state: RootState) => state.productStepper.step;
