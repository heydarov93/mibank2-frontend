import * as yup from 'yup';

import { REG_EXP } from './regExp';

import currencies from 'constants/currencies';
import i18n from 'i18n';

const key = 'TransfersPage';

function validateIBAN(
  schema: yup.StringSchema<string, yup.AnyObject, undefined, ''>,
) {
  return schema.matches(/^PL\d{26}$/, i18n.t(`${key}.error.ibanFieldPattern`));
}

function validateCard(
  schema: yup.StringSchema<string, yup.AnyObject, undefined, ''>,
) {
  return schema.matches(/^\d{16}$/, i18n.t(`${key}.error.cardFieldPattern`));
}

function isModeIBAN(mode: string) {
  return () => mode === 'IBAN';
}

export const schema = (mode: string) =>
  yup.object().shape({
    fromAccount: yup
      .string()
      .transform((value) => value?.replace(/\s+/g, ''))
      .trim()
      .required(i18n.t(`${key}.error.accountFieldRequired`))
      .when([], {
        is: isModeIBAN(mode),
        then: validateIBAN,
        otherwise: validateCard,
      }),
    toAccount: yup
      .string()
      .transform((value) => value?.replace(/\s+/g, ''))
      .trim()
      .required(i18n.t(`${key}.error.accountFieldRequired`))
      .when([], {
        is: isModeIBAN(mode),
        then: validateIBAN,
        otherwise: validateCard,
      }),
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
