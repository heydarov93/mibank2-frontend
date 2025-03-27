import { t } from 'i18next';

import { FilterGroup } from 'models/IFilterInfo';

export const initialProductSubtypes: FilterGroup[] = [
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

export const initialProductTypes = [
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

export const tableHead = [
  { label: t('BackOffice.CreateProduct.productName'), key: 'productName' },
  {
    label: t('BackOffice.CreateProduct.productSubtype'),
    key: 'productSubtype',
  },
  { label: t('BackOffice.CreateProduct.productStatus'), key: 'productStatus' },
];
