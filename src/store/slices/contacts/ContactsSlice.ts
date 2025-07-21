import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IContacts } from './contacts.types';

import { IFooterContactsInfo } from 'models/IFooterContactsInfo';
import { SLICE_NAMES } from 'store/constants/sliceNames';

const initialState: IContacts = {
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

const ContactsSlice = createSlice({
  name: SLICE_NAMES.CONTACTS,
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<IFooterContactsInfo>) => {
      state.info = action.payload;
    },
  },
});

export const { setContacts } = ContactsSlice.actions;
export default ContactsSlice.reducer;
