import * as yup from 'yup';

export const transactionFiltersSchema = yup.object().shape({
  time: yup.string().required(),
  card: yup.array(yup.string()).required(),
  template: yup.string().required(),
  transactionsType: yup.array(yup.string()).required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});

export type TTransactionFiltersValues = yup.InferType<
  typeof transactionFiltersSchema
>;
