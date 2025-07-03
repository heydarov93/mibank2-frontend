import { Box, debounce } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  HeaderContainer,
  MainContainer,
} from './BackOfficeViewProductsPage.styled';

import { useDeleteDepositMutation } from 'api/deleteDepositApi';
import { useGetProductsQuery } from 'api/getProductsApi';
import {
  BackOfficeViewHeader,
  BackOfficeWarningWindow,
  NoMatchesFound,
} from 'components/molecules';
import BackOfficeConfirmationWindow from 'components/molecules/BackOfficeConfirmationWindow/BackOfficeConfirmationWindow';
import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import FilterBox from 'components/molecules/FilterBox/FilterBox';
import SearchField from 'components/molecules/SearchField/SearchField';
import BackOfficeCardEditForm from 'components/organisms/BackOfficeCardEditForm/BackOfficeCardEditForm';
import BackOfficeDepositEditForm from 'components/organisms/BackOfficeDepositEditForm/BackOfficeDepositEditForm';
import BackOfficeTable from 'components/organisms/BackOfficeTable/BackOfficeTable';
import { tableHead } from 'constants/productTableHead';
import { TO_BACK_OFFICE_CREATE_PRODUCT } from 'constants/routesName';
import {
  SEARCH_LOWEST_LIMIT,
  SEARCH_VALUE_ZERO,
} from 'constants/searchInputValues';
import { ProductType } from 'enums/EProductType';
import { useProductFilters } from 'hooks/useProductFilters';
import { useProductManage } from 'hooks/useProductManage';
import { IBackOfficeErrorData } from 'models/IError';
import { DepositBackendData } from 'models/IProductInfo';

export const BackOfficeViewProductsPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const { control, setValue, watch } = useForm();
  const searchValue = watch('productSearch');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {
    state,
    handleDelete,
    handleDeleteSuccess,
    handleDeleteError,
    handleEdit,
    handleSuccessfulUpdate,
    handleError,
    handleClose,
    handlePageChange,
    handlePageSizeChange,
    closeDeleteWindow,
    closeConfirmationWindow,
  } = useProductManage();

  const {
    data: products,
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useGetProductsQuery({
    page: state.page,
    size: state.pageSize,
    search: searchQuery,
  });

  const allProducts = Object.values(
    products ?? {},
  ).flat() as DepositBackendData[];

  const [
    deleteDeposit,
    { isLoading: isDeleteLoading, isError: isDeleteError },
  ] = useDeleteDepositMutation();

  const mappedData =
    allProducts?.map((item: DepositBackendData) => ({
      id: item.id,
      productType: item?.type?.split(' ').at(1),
      productName: item.name,
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

  const {
    productSubtypes,
    productTypes,
    setProductSubtypes,
    setProductTypes,
    handleFilterChange,
    filteredTableBody,
  } = useProductFilters(mappedData);

  const handleDeleteDeposit = async (
    product: Partial<TableData> | undefined,
  ) => {
    if (product?.productType === ProductType.DEPOSIT) {
      try {
        await deleteDeposit(product.id).unwrap();
        refetchProducts();
        handleDeleteSuccess();
      } catch (e) {
        handleDeleteError(e as IBackOfficeErrorData);
      }
    }
  };

  const updateSearchValue = (inputValue: string) => {
    if (inputValue.length === SEARCH_VALUE_ZERO) {
      handleViewAll();
    } else if (inputValue.length >= SEARCH_LOWEST_LIMIT) {
      setSearchQuery(inputValue);
      setValue('productSearch', inputValue);
    }
  };

  const debouncedSearchEnter = useMemo(
    () => debounce(updateSearchValue, 400),
    [setSearchQuery, setValue],
  );

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputValue = searchValue?.trim() || '';
      debouncedSearchEnter(inputValue);
    }
  };

  const handleViewAll = () => {
    setSearchQuery('');
    setValue('productSearch', '');
    refetchProducts();
  };

  const isVisible = state.isEditFormVisible || state.isDepositFormVisible;

  return (
    <Box sx={{ position: 'relative' }}>
      <MainContainer blur={isVisible}>
        <BackOfficeViewHeader
          path={TO_BACK_OFFICE_CREATE_PRODUCT}
          primaryHeader={t('header.finProducts')}
          secondaryHeader={t('header.viewProducts')}
          btnContent={t('header.createBtnContent')}
        />
        <HeaderContainer>
          <Box sx={{ width: '400px', height: '100%' }}>
            <SearchField
              name="productSearch"
              control={control}
              placeholder={t('header.searchProducts')}
              onKeyDown={handleSearchEnter}
            />
            {searchQuery && allProducts.length === 0 && (
              <NoMatchesFound
                onViewAll={handleViewAll}
                errorTitle={t('noMatchesFound.notFound')}
                errorSubTitle={t('noMatchesFound.tryAgain')}
                viewAllText={t('noMatchesFound.viewAllProducts')}
              />
            )}
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
          tableBody={filteredTableBody()}
          totalItems={allProducts.length || 0}
          page={state.page}
          pageSize={state.pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onDeleteClick={handleDelete}
          onEditClick={handleEdit}
          isLoading={isProductsLoading}
        />
        <BackOfficeWarningWindow
          sx={{ left: '150px' }}
          product={state.selectedProduct}
          onCancelClick={closeDeleteWindow}
          onDeleteClick={handleDeleteDeposit}
          title={state.warningTitle}
          text={state.warningBody}
          isLoading={isDeleteLoading}
          isError={isDeleteError}
          errorMessage={state.errorMessage}
          open={state.isDeleteVisible}
        />
      </MainContainer>
      {state.isEditFormVisible && (
        <BackOfficeCardEditForm
          handleClose={handleClose}
          formData={state.formData}
        />
      )}
      {state.isDepositFormVisible && (
        <BackOfficeDepositEditForm
          onClose={handleClose}
          formData={state.formData}
          onSuccess={handleSuccessfulUpdate}
          onError={handleError}
          refetchProducts={refetchProducts}
        />
      )}
      {state.isConfirmationWindowVisible && (
        <BackOfficeConfirmationWindow
          sx={{ top: '50px', left: '520px' }}
          onClose={closeConfirmationWindow}
          title={state.confirmationTitle}
          body={state.confirmationBody}
        />
      )}
    </Box>
  );
};
