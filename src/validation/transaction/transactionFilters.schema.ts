import * as yup from 'yup';

import { ETransactionType } from 'enums/ETransactionType';

export const transactionFiltersSchema = yup.object().shape({
  time: yup.string(),
  card: yup.array(yup.string()),
  template: yup.array(yup.string()),
  transactionsType: yup
    .string()
    .oneOf([
      ETransactionType.ALL,
      ETransactionType.EXPENSE,
      ETransactionType.INCOME,
    ]),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});

export type TTransactionFiltersValues = yup.InferType<
  typeof transactionFiltersSchema
>;
