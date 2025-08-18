import { t } from 'i18next';

import { FilterGroup } from 'models/IFilter';

export const INITIAL_PRODUCT_SUB_TYPES: FilterGroup[] = [
  {
    groupTitle: t('BackOffice.CreateProduct.card'),
    options: [
      {
        name: 'debitCard',
        label: t('BackOffice.CreateProduct.debitCard'),
        checked: true,
      },
      {
        name: 'creditCard',
        label: t('BackOffice.CreateProduct.cCard'),
        checked: true,
      },
    ],
  },
  {
    groupTitle: t('BackOffice.CreateProduct.deposit'),
    options: [
      {
        name: 'teamDeposit',
        label: t('BackOffice.CreateProduct.teamDeposit'),
        checked: true,
      },
      {
        name: 'demandDeposit',
        label: t('BackOffice.CreateProduct.demandDeposit'),
        checked: true,
      },
      {
        name: 'savingDeposit',
        label: t('BackOffice.CreateProduct.savingDeposit'),
        checked: true,
      },
      {
        name: 'targetDeposit',
        label: t('BackOffice.CreateProduct.targetDeposit'),
        checked: true,
      },
    ],
  },
];

export const INITIAL_PRODUCT_TYPES = [
  {
    options: [
      {
        name: 'deposits',
        label: t('BackOffice.CreateProduct.deposit'),
        checked: true,
      },
      {
        name: 'cards',
        label: t('BackOffice.CreateProduct.card'),
        checked: true,
      },
    ],
  },
];

export const TABLE_HEAD = [
  { label: t('BackOffice.CreateProduct.productName'), key: 'productName' },
  {
    label: t('BackOffice.CreateProduct.productSubtype'),
    key: 'productSubtype',
  },
  { label: t('BackOffice.CreateProduct.productStatus'), key: 'productStatus' },
  { label: t('BackOffice.CreateProduct.addedDate'), key: 'addedDate' }, // New column
];
