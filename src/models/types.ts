import { flagIcons } from 'components/atoms';

export type TCurrency = keyof typeof flagIcons;
export type TCardIssuer = 'visa' | 'mastercard' | 'unionpay';
export type TTransactionType = 'income' | 'expense';
export type TCardStatus = 'active' | 'blocked' | 'expired';
export type TCardType = 'digital' | 'plastic';
