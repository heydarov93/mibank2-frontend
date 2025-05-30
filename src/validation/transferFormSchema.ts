import { IBAN } from 'ibankit';
import * as yup from 'yup';

import { isValidCardNumber } from './isValidCardNumber';
import { REG_EXP } from './regExp';

import currencies from 'constants/currencies';
import i18n from 'i18n';
import { TTransferMethod } from 'pages/TransfersPage/TransfersPage';

const key = 'TransfersPage';

function validateCard(
  schema: yup.StringSchema<string, yup.AnyObject, undefined, ''>,
) {
  return schema.test(
    'card',
    i18n.t(`${key}.error.cardFieldPattern`),
    (value) => {
      return isValidCardNumber(value);
    },
  );
}

function validateIBAN(
  schema: yup.StringSchema<string, yup.AnyObject, undefined, ''>,
) {
  return schema.test(
    'iban',
    i18n.t(`${key}.error.ibanFieldPattern`),
    (value) => {
      return IBAN.isValid(value);
    },
  );
}

function validateAccountNumber(mode: TTransferMethod) {
  return yup
    .string()
    .transform((value) => value?.replace(/\s+/g, ''))
    .trim()
    .required(i18n.t(`${key}.error.accountFieldRequired`))
    .when([], {
      is: () => mode === 'iban',
      then: validateIBAN,
      otherwise: validateCard,
    })
    .test('source and target are same', (_, context) => isAccountSame(context));
}

function isAccountSame(context: yup.TestContext<yup.AnyObject>) {
  const toAccount = context.parent.toAccount;
  const fromAccount = context.parent.fromAccount;
  if (fromAccount === toAccount) {
    return context.createError({
      path: context.path,
      message: i18n.t(`${key}.error.accountsSame`),
    });
  }

  return true;
}

export const schema = (mode: TTransferMethod) =>
  yup.object().shape({
    fromAccount: validateAccountNumber(mode),
    toAccount: validateAccountNumber(mode),
    amount: yup
      .string()
      .matches(/^\d{1,10}(\.\d{1,2})?$/, i18n.t(`${key}.error.amountPattern`))
      .transform((value) => (Number.isNaN(value) ? null : value))
      .required(i18n.t(`${key}.error.amountRequired`))
      .test('minAmount', 'amount too low', (value, context) => {
        const currency = context.parent.currency;
        const minAmount = currency === 'JPY' ? 100 : 1;

        if (Number(value) < minAmount) {
          return context.createError({
            path: context.path,
            message: i18n
              .t(`${key}.error.amountMinimum`)
              .concat(` ${minAmount} ${currency}`),
          });
        }

        return true;
      }),

    currency: yup.string().required().oneOf(currencies),
    message: yup
      .string()
      .transform((value) => value ?? '')
      .optional()
      .max(150, i18n.t(`${key}.error.messageMaxCharacters`))
      .matches(
        REG_EXP.latinLettersDigitsSpecialRegExp,
        i18n.t(`${key}.error.messagePattern`),
      ),
  });
