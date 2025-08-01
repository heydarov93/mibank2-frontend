import { IBAN } from 'ibankit';
import * as yup from 'yup';

import { t } from 'config';
import { SUPPORTED_CURRENCIES } from 'constants/data/currencies';
import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';
import { TTransferMethod } from 'types/types';
import { checkValidCardNumber } from 'utils/checkers/cardNumberChecker';
import { removeSpaces } from 'utils/helpers/validationHelpers';

const VALIDATION_KEY = 'TransfersPage.error';

function validateCard(
  schema: yup.StringSchema<string, yup.AnyObject, undefined, ''>,
) {
  return schema.test(
    'card',
    t(`${VALIDATION_KEY}.cardFieldPattern`),
    (value) => {
      return checkValidCardNumber(value);
    },
  );
}

function validateIBAN(
  schema: yup.StringSchema<string, yup.AnyObject, undefined, ''>,
) {
  return schema.test(
    'iban',
    t(`${VALIDATION_KEY}.ibanFieldPattern`),
    (value) => {
      return IBAN.isValid(value);
    },
  );
}

function validateAccountNumber(mode: TTransferMethod) {
  return yup
    .string()
    .transform(removeSpaces)
    .trim()
    .required(t(`${VALIDATION_KEY}.accountFieldRequired`))
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
      message: t(`${VALIDATION_KEY}.accountsSame`),
    });
  }

  return true;
}

export const moneyTransferSchema = (mode: TTransferMethod) =>
  yup.object().shape({
    fromAccount: validateAccountNumber(mode),
    toAccount: validateAccountNumber(mode),
    amount: yup
      .string()
      .matches(
        VALIDATION_PATTERNS.AMOUNT_PATTERN,
        t(`${VALIDATION_KEY}.amountPattern`),
      )
      .transform((value) => (Number.isNaN(value) ? null : value))
      .required(t(`${VALIDATION_KEY}.amountRequired`))
      .test('minAmount', 'amount too low', (value, context) => {
        const currency = context.parent.currency;
        const minAmount = currency === 'JPY' ? 100 : 1;

        if (Number(value) < minAmount) {
          return context.createError({
            path: context.path,
            message: t(`${VALIDATION_KEY}.amountMinimum`).concat(
              ` ${minAmount} ${currency}`,
            ),
          });
        }

        return true;
      }),

    currency: yup.string().required().oneOf(SUPPORTED_CURRENCIES),
    message: yup
      .string()
      .transform((value) => value ?? '')
      .optional()
      .max(
        VALIDATION_LIMITS.MESSAGE_MAX_LENGTH,
        t(`${VALIDATION_KEY}.messageMaxCharacters`),
      )
      .matches(
        VALIDATION_PATTERNS.LATIN_ONLY_SPECIAL,
        t(`${VALIDATION_KEY}.messagePattern`),
      ),
  });

export type TMoneyTransferValues = yup.InferType<
  ReturnType<typeof moneyTransferSchema>
>;
