import { TFunction } from 'i18next';
import * as yup from 'yup';

const transfersPage = 'transferModal';

export const savePaymentSchema = (t: TFunction) =>
  yup.object().shape({
    paymentName: yup
      .string()
      .required(t(`${transfersPage}.validation.required`))
      .matches(/^[A-Za-z0-9 ]*$/, t(`${transfersPage}.validation.onlyLatin`))
      .max(50, t(`${transfersPage}.validation.maxLength`)),
  });
