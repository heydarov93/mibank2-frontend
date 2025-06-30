import { flagIcons } from 'components/atoms';

export type TCurrency = keyof typeof flagIcons;
export type TCardIssuer = 'visa' | 'mastercard' | 'unionpay';
export type TCardStatus = 'active' | 'blocked' | 'expired';
export type TCardIssueType = 'digital' | 'plastic';
export type TCardType = 'debit' | 'credit';
export type TTransactionType = 'income' | 'expense';
