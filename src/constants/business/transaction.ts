import { t } from 'i18next';

import { SelectFieldOption } from 'components/molecules';

export const TRANSACTION_FILTER_OPTIONS = [
  t('Homepage.sidebar.myTransactions.all'),
  t('Homepage.sidebar.myTransactions.income'),
  t('Homepage.sidebar.myTransactions.expenses'),
] as const;

export const TRANSACTION_EMPTY_STATE_CONTENTS = {
  'no-matches': {
    title: t('TransactionsHistoryPage.emptyStatesContent.noMatches.title'),
    message: t('TransactionsHistoryPage.emptyStatesContent.noMatches.message'),
  },
  'no-transactions': {
    title: t('TransactionsHistoryPage.emptyStatesContent.noTransactions.title'),
    message: t(
      'TransactionsHistoryPage.emptyStatesContent.noTransactions.message',
    ),
  },
  offline: {
    title: t('TransactionsHistoryPage.emptyStatesContent.offline.title'),
    message: t('TransactionsHistoryPage.emptyStatesContent.offline.message'),
  },
} as const;

export const CARD_OPTIONS: SelectFieldOption[] = [
  {
    value: 'All cards',
    preventClosing: true,
  },
  {
    value: 'Strong Card **** 5678',
    preventClosing: true,
  },
  {
    value: 'Strong Card **** 1234',
    preventClosing: true,
  },
];

export const TEMPLATE_OPTIONS: SelectFieldOption[] = [
  { value: 'All templates' },
  { value: 'Template 1' },
  { value: 'Template 2' },
  { value: 'Template 3' },
  { value: 'Template 4' },
];
