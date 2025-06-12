import * as yup from 'yup';

export const validationTransactionFiltersSchema = yup.object().shape({
  time: yup.string().required(),
  card: yup.string().required(),
  template: yup.string().required(),
  transactionsType: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});

export type TransactionFiltersFormValues = yup.InferType<
  typeof validationTransactionFiltersSchema
>;
