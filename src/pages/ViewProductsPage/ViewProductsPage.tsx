import { Box, debounce } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledContainer } from './ViewProductsPage.styled';

import { useDeleteDepositMutation } from 'api/services/deposit-service/deposits.api';
import { useGetProductsQuery } from 'api/services/deposit-service/products.api';
import {
  BackOfficeViewHeader,
  BackOfficeWarningWindow,
} from 'components/molecules';
import BackOfficeConfirmationWindow from 'components/molecules/BackOfficeConfirmationWindow/BackOfficeConfirmationWindow';
import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import { ViewProductsSearchContainer } from 'components/organisms';
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
import { DepositResponseData } from 'models/IProductInfo';
import { mapProductData } from 'utils/mapper';

export const ViewProductsPage = () => {
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
    page,
    pageSize,
    isDepositFormVisible,
    isEditFormVisible,
    isConfirmationWindowVisible,
    warningBody,
    warningTitle,
    errorMessage,
    isDeleteVisible,
    confirmationBody,
    confirmationTitle,
    formData,
    selectedProduct,
  } = state;

  const {
    data: products,
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useGetProductsQuery({
    page: page,
    size: pageSize,
    search: searchQuery,
  });

  const allProducts = Object.values(
    products ?? {},
  ).flat() as DepositResponseData[];

  const [
    deleteDeposit,
    { isLoading: isDeleteLoading, isError: isDeleteError },
  ] = useDeleteDepositMutation();

  const mappedData = allProducts?.map((product) => mapProductData(product)) || [];
  const { filteredTableBody } = useProductFilters(mappedData);

  const handleDeleteDeposit = async (
    product: Partial<TableData> | undefined,
  ) => {
    if (
      product?.productType === ProductType.DEPOSIT &&
      typeof product.id === 'number'
    ) {
      try {
        await deleteDeposit({ id: product.id }).unwrap();
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

  const isModalVisible = isEditFormVisible || isDepositFormVisible;
  const showNoMatches = Boolean(searchQuery) && allProducts.length === 0;

  return (
    <Box sx={{ position: 'relative' }}>
      <StyledContainer blur={isModalVisible}>
        <BackOfficeViewHeader
          path={TO_BACK_OFFICE_CREATE_PRODUCT}
          primaryHeader={t('header.finProducts')}
          secondaryHeader={t('header.viewProducts')}
          btnContent={t('header.createBtnContent')}
        />
        <ViewProductsSearchContainer
          productsData={mappedData}
          showNoMatches={showNoMatches}
          onSearchEnter={handleSearchEnter}
          onViewAll={handleViewAll}
          control={control}
        />
        <BackOfficeTable
          tableHead={tableHead}
          tableBody={filteredTableBody()}
          totalItems={allProducts.length || 0}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onDeleteClick={handleDelete}
          onEditClick={handleEdit}
          isLoading={isProductsLoading}
        />
        <BackOfficeWarningWindow
          sx={{ left: '150px' }}
          product={selectedProduct}
          onCancelClick={closeDeleteWindow}
          onDeleteClick={handleDeleteDeposit}
          title={warningTitle}
          text={warningBody}
          isLoading={isDeleteLoading}
          isError={isDeleteError}
          errorMessage={errorMessage}
          open={isDeleteVisible}
        />
      </StyledContainer>
      {isEditFormVisible && (
        <BackOfficeCardEditForm handleClose={handleClose} formData={formData} />
      )}
      {isDepositFormVisible && (
        <BackOfficeDepositEditForm
          onClose={handleClose}
          formData={formData}
          onSuccess={handleSuccessfulUpdate}
          onError={handleError}
          refetchProducts={refetchProducts}
        />
      )}
      {isConfirmationWindowVisible && (
        <BackOfficeConfirmationWindow
          sx={{ top: '50px', left: '520px' }}
          onClose={closeConfirmationWindow}
          title={confirmationTitle}
          body={confirmationBody}
        />
      )}
    </Box>
  );
};
