import { icons } from 'components/atoms';

export type TCurrency = keyof typeof icons;
export type TCardIssuer = 'visa' | 'mastercard';
export type TTransactionType = 'income' | 'expense';
