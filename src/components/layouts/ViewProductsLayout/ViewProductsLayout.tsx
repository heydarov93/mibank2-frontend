import Box from '@mui/material/Box';
import { debounce } from '@mui/material/utils';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledContainer } from './ViewProductsLayout.styled';

import { useDeleteDepositMutation } from 'api/services/deposit-service/deposits.api';
import { useGetProductsQuery } from 'api/services/deposit-service/products.api';
import {
  BackOfficeViewHeader,
  ConfirmationWindow,
  WarningWindow,
} from 'components/molecules';
import {
  DepositEditForm,
  BackOfficeTable,
  ProductsSearchContainer,
  CardEditForm,
} from 'components/organisms';
import { TO_BACK_OFFICE_CREATE_PRODUCT } from 'constants/navigation/routePaths';
import { SEARCH_LOWEST_LIMIT, SEARCH_VALUE_ZERO } from 'constants/ui/search';
import { TABLE_HEAD } from 'constants/ui/table';
import { ProductType } from 'enums/EProductType';
import { useProductActions } from 'hooks/product/useProductActions';
import { useProductFilters } from 'hooks/product/useProductFilters';
import { IBackOfficeErrorData } from 'models/IError';
import { DepositResponseData } from 'models/IProductInfo';
import { TableData } from 'models/ITableData';
import { mapProductData } from 'utils/mapper';

export const ViewProductsLayout = () => {
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
  } = useProductActions();

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

  const mappedData =
    allProducts?.map((product) => mapProductData(product)) || [];
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
        <ProductsSearchContainer
          productsData={mappedData}
          showNoMatches={showNoMatches}
          onSearchEnter={handleSearchEnter}
          onViewAll={handleViewAll}
          control={control}
        />
        <BackOfficeTable
          tableHead={TABLE_HEAD}
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
        <WarningWindow
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
        <CardEditForm handleClose={handleClose} formData={formData} />
      )}
      {isDepositFormVisible && (
        <DepositEditForm
          onClose={handleClose}
          formData={formData}
          onSuccess={handleSuccessfulUpdate}
          onError={handleError}
          refetchProducts={refetchProducts}
        />
      )}
      {isConfirmationWindowVisible && (
        <ConfirmationWindow
          sx={{ top: '50px', left: '520px' }}
          onClose={closeConfirmationWindow}
          title={confirmationTitle}
          body={confirmationBody}
        />
      )}
    </Box>
  );
};
