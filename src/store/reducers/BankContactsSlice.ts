import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFooterContactsInfo } from 'models/IFooterContactsInfo';

interface BankContacts {
  info: {
    id: number;
    email: string;
    phoneNumber: string;
    contactCenterWorkingDays: string;
    contactCenterShortenedDays: string;
    contactCenterWorkingDayBeginTime: string;
    contactCenterWorkingDayEndTime: string;
    contactCenterShortenedDayBeginTime: string;
    contactCenterShortenedDayEndTime: string;
  };
}

const initialState: BankContacts = {
  info: {
    id: 0,
    email: '',
    phoneNumber: '',
    contactCenterWorkingDays: '',
    contactCenterShortenedDays: '',
    contactCenterWorkingDayBeginTime: '',
    contactCenterWorkingDayEndTime: '',
    contactCenterShortenedDayBeginTime: '',
    contactCenterShortenedDayEndTime: '',
  },
};

const BankContactsSlice = createSlice({
  name: 'BankContacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<IFooterContactsInfo>) => {
      state.info = action.payload;
    },
  },
});

export const { setContacts } = BankContactsSlice.actions;
export default BankContactsSlice.reducer;
