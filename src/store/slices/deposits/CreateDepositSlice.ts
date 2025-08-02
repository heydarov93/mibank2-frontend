import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IDepositFormData } from 'models/IDeposit';
import { SLICE_NAMES } from 'store/constants/sliceNames';

const initialState: IDepositFormData = {
  minimumDepositSum: 0,
  maximumDepositSum: 0,
  depositTerm: 0,
  depositInterestRate: 0,
  depositCapitalizationRate: 0,
  earlyWithdrawal: false,
  earlyWithdrawalLimit: 0,
  earlyWithdrawalFee: 0,
  autoRenewable: false,
  augmentable: false,
};

const CreateDepositSlice = createSlice({
  name: SLICE_NAMES.CREATE_DEPOSIT,
  initialState,
  reducers: {
    setDepositData(state, action: PayloadAction<IDepositFormData>) {
      state.autoRenewable = action.payload.augmentable;
      state.autoRenewable = action.payload.autoRenewable;
      state.earlyWithdrawalFee = action.payload.earlyWithdrawalFee;
      state.earlyWithdrawalLimit = action.payload.earlyWithdrawalLimit;
      state.earlyWithdrawal = action.payload.earlyWithdrawal;
      state.depositCapitalizationRate =
        action.payload.depositCapitalizationRate;
      state.depositInterestRate = action.payload.depositInterestRate;
      state.depositTerm = action.payload.depositTerm;
      state.maximumDepositSum = action.payload.maximumDepositSum;
      state.minimumDepositSum = action.payload.minimumDepositSum;
    },
    resetDepositData() {
      return initialState;
    },
  },
});

export const { setDepositData, resetDepositData } = CreateDepositSlice.actions;
export default CreateDepositSlice.reducer;
