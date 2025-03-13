import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  HeaderContainer,
  MainContainer,
} from './BackOfficeViewProductsPage.styled';

import { useGetDepositsQuery } from 'api/getDepositsApi';
import { BackOfficeWarningWindow } from 'components/molecules';
import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import BackOfficeViewProductsHeader from 'components/molecules/BackOfficeViewProductsHeader/BackOfficeViewProductsHeader';
import FilterBox from 'components/molecules/FilterBox/FilterBox';
import SearchField from 'components/molecules/SearchField/SearchField';
import BackOfficeCardEditForm from 'components/organisms/BackOfficeCardEditForm/BackOfficeCardEditForm';
import BackOfficeDepositEditForm from 'components/organisms/BackOfficeDepositEditForm/BackOfficeDepositEditForm';
import BackOfficeTable from 'components/organisms/BackOfficeTable/BackOfficeTable';
import { FilterGroup } from 'models/IFilterInfo';
import { DepositBackendData } from 'models/IProductInfo';

const BackOfficeViewProductsPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const { control } = useForm();

  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [productName, setProductName] = useState<string | undefined>('');
  const [isEditFormVisible, setIsFormVisible] = useState<boolean>(false);

  const [isDepositFormVisible, setIsDepositFormVisible] =
    useState<boolean>(false);
  const [formData, setFormData] = useState({});

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading } = useGetDepositsQuery({ page, size: pageSize });

  const mappedData =
    data?.content?.map((item: DepositBackendData) => ({
      id: item.id,
      productName: item.term
        ? t('CreateProduct.deposit')
        : t('CreateProduct.card'),
      productSubtype: item.type,
      cardDescription: item.description,
      cardCurrency: item.currency,
      minimumDepositSum: item.min?.toString(),
      maximumDepositSum: item.max?.toString(),
      depositTerm: item.term?.toString(),
      depositInterestRate: item.interestRate?.toString(),
      depositCapitalizationRate: item.capitalization?.toString(),
      earlyWithdrawalLimit: item.earlyWithdrawalLimit?.toString(),
      withdrawalFee: item.earlyWithdrawalFee?.toString(),
    })) || [];

  const initialProductSubtypes: FilterGroup[] = [
    {
      groupTitle: t('CreateProduct.card'),
      options: [
        {
          name: 'debitCard',
          label: t('CreateProduct.debitCard'),
          checked: true,
        },
        { name: 'creditCard', label: t('CreateProduct.cCard'), checked: true },
      ],
    },
    {
      groupTitle: t('CreateProduct.deposit'),
      options: [
        {
          name: 'teamDeposit',
          label: t('CreateProduct.teamDeposit'),
          checked: true,
        },
        {
          name: 'demandDeposit',
          label: t('CreateProduct.demandDeposit'),
          checked: true,
        },
        {
          name: 'savingDeposit',
          label: t('CreateProduct.savingDeposit'),
          checked: true,
        },
        {
          name: 'targetDeposit',
          label: t('CreateProduct.targetDeposit'),
          checked: true,
        },
      ],
    },
  ];

  const initialProductTypes = [
    {
      options: [
        { name: 'deposits', label: t('CreateProduct.deposit'), checked: true },
        { name: 'cards', label: t('CreateProduct.card'), checked: true },
      ],
    },
  ];

  const [productSubtypes, setProductSubtypes] = useState<FilterGroup[]>(
    initialProductSubtypes,
  );
  const [productTypes, setProductTypes] =
    useState<FilterGroup[]>(initialProductTypes);

  const tableHead = [
    { label: t('CreateProduct.productName'), key: 'productName' },
    { label: t('CreateProduct.productSubtype'), key: 'productSubtype' },
    { label: t('CreateProduct.productStatus'), key: 'productStatus' },
  ];

  const handleFilterChange = (
    updatedGroups: FilterGroup[],
    setFilterState: React.Dispatch<React.SetStateAction<FilterGroup[]>>,
  ) => {
    setFilterState(updatedGroups);
  };

  const selectedProductTypes = productTypes[0].options
    .filter((option) => option.checked)
    .map((option) => option.name);

  const selectedSubtypes = productSubtypes.flatMap((group) =>
    group.options
      .filter((option) => option.checked)
      .map((option) => option.label),
  );

  const filteredTableBody = mappedData.filter((item: Partial<TableData>) => {
    const isProductTypeMatch =
      (selectedProductTypes.includes('deposits') &&
        item.productName === 'Deposit') ||
      (selectedProductTypes.includes('cards') && item.productName === 'Card');

    const isSubtypeMatch = selectedSubtypes.includes(item.productSubtype || '');
    return isProductTypeMatch && isSubtypeMatch;
  });

  const handleDelete = (product: Partial<TableData>) => {
    setProductName(product.productName);
    setIsDeleteVisible(true);
  };

  const handleEdit = (product: Partial<TableData>) => {
    if (product.productName === 'Card') {
      setFormData(product);
      setIsFormVisible(true);
    } else {
      setIsDepositFormVisible(true);
      setFormData(product);
    }
  };

  const handleClose = () => {
    setIsFormVisible(false);
    setIsDepositFormVisible(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(0);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <MainContainer blur={isEditFormVisible || isDepositFormVisible}>
        <BackOfficeViewProductsHeader />
        <HeaderContainer>
          <Box sx={{ width: '400px', height: '100%' }}>
            <SearchField
              name="productSearch"
              control={control}
              placeholder={t('header.searchProducts')}
            />
          </Box>
          <FilterBox
            title={t('header.products')}
            groups={productTypes}
            onFilterChange={(updatedGroups) =>
              handleFilterChange(updatedGroups, setProductTypes)
            }
          />
          <FilterBox
            title={t('header.productSubtypes')}
            groups={productSubtypes}
            onFilterChange={(updatedGroups) =>
              handleFilterChange(updatedGroups, setProductSubtypes)
            }
          />
        </HeaderContainer>
        <BackOfficeTable
          tableHead={tableHead}
          tableBody={filteredTableBody}
          totalItems={data?.page.totalElements || 0}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onDeleteClick={handleDelete}
          onEditClick={handleEdit}
          isLoading={isLoading}
        />
        {isDeleteVisible && (
          <BackOfficeWarningWindow
            sx={{ top: '290px', left: '100px' }}
            productName={productName}
            onCancelClick={() => setIsDeleteVisible(false)}
            title={t('warningWindow.deleteDeposit')}
            text={t('warningWindow.deleteDepositText')}
          />
        )}
      </MainContainer>
      {isEditFormVisible && (
        <BackOfficeCardEditForm handleClose={handleClose} formData={formData} />
      )}
      {isDepositFormVisible && (
        <BackOfficeDepositEditForm onClose={handleClose} formData={formData} />
      )}
    </Box>
  );
};

export default BackOfficeViewProductsPage;
