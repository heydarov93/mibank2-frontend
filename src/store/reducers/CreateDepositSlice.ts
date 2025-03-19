import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DepositFormData } from 'models/IProductInfo';

const initialState: DepositFormData = {
  min: 0,
  max: 0,
  term: 0,
  interestRate: 0,
  capitalization: 0,
  earlyWithdrawal: false,
  earlyWithdrawalLimit: 0,
  earlyWithdrawalFee: 0,
  autoRenewable: false,
  augmentable: false,
};

const CreateDepositSlice = createSlice({
  name: 'createDeposit',
  initialState,
  reducers: {
    setDepositData(state, action: PayloadAction<DepositFormData>) {
      state.autoRenewable = action.payload.augmentable;
      state.autoRenewable = action.payload.autoRenewable;
      state.earlyWithdrawalFee = action.payload.earlyWithdrawalFee;
      state.earlyWithdrawalLimit = action.payload.earlyWithdrawalLimit;
      state.earlyWithdrawal = action.payload.earlyWithdrawal;
      state.capitalization = action.payload.capitalization;
      state.interestRate = action.payload.interestRate;
      state.term = action.payload.term;
      state.max = action.payload.max;
      state.min = action.payload.min;
    },
    resetDepositData() {
      return initialState;
    },
  },
});

export const { setDepositData, resetDepositData } = CreateDepositSlice.actions;
export default CreateDepositSlice.reducer;
