import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IContact, IContactsInfo } from 'models/IContacts';
import { SLICE_NAMES } from 'store/constants/sliceNames';

const initialState: IContactsInfo = {
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
    setContacts: (state, action: PayloadAction<IContact>) => {
      state.info = action.payload;
    },
  },
});

export const { setContacts } = ContactsSlice.actions;
export default ContactsSlice.reducer;
