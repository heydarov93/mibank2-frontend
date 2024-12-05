import { Middleware } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import {
  setPersonalInfoData,
  setDocumentInfoData,
  setEUDocumentInfoData,
  setAddressData,
} from '../store/reducers/RegistrationSlice';

const transformDate = (dateString: string): string => {
  return dayjs(dateString).format('YYYY-MM-DD');
};

const registrationDataMiddleware: Middleware = () => (next) => (action) => {
  if (setPersonalInfoData.match(action)) {
    const payload = { ...action.payload };

    if (payload.dateOfBirth) {
      payload.dateOfBirth = transformDate(payload.dateOfBirth);
    }

    return next({ ...action, payload });
  }

  if (setAddressData.match(action)) {
    const payload = { ...action.payload };

    if (payload.postcode) {
      payload.postcode = payload.postcode.replace(/-/g, '');
    }

    return next({ ...action, payload });
  }

  if (setDocumentInfoData.match(action)) {
    const payload = { ...action.payload };

    if (payload.issueDate) {
      payload.issueDate = transformDate(payload.issueDate);
    }

    if (payload.expirationDate) {
      payload.expirationDate = transformDate(payload.expirationDate);
    }

    return next({ ...action, payload });
  }
  if (setEUDocumentInfoData.match(action)) {
    const payload = { ...action.payload };

    if (payload.issueDate) {
      payload.issueDate = transformDate(payload.issueDate);
    }

    if (payload.expirationDate) {
      payload.expirationDate = transformDate(payload.expirationDate);
    }

    return next({ ...action, payload });
  }

  return next(action);
};

export default registrationDataMiddleware;
