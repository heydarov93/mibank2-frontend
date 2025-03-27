import { Box } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  HeaderContainer,
  MainContainer,
} from './BackOfficeViewProductsPage.styled';

import { useDeleteDepositMutation } from 'api/deleteDepositApi';
import { useGetDepositsQuery } from 'api/getDepositsApi';
import { BackOfficeWarningWindow } from 'components/molecules';
import BackOfficeConfirmationWindow from 'components/molecules/BackOfficeConfirmationWindow/BackOfficeConfirmationWindow';
import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import BackOfficeViewProductsHeader from 'components/molecules/BackOfficeViewProductsHeader/BackOfficeViewProductsHeader';
import FilterBox from 'components/molecules/FilterBox/FilterBox';
import SearchField from 'components/molecules/SearchField/SearchField';
import BackOfficeCardEditForm from 'components/organisms/BackOfficeCardEditForm/BackOfficeCardEditForm';
import BackOfficeDepositEditForm from 'components/organisms/BackOfficeDepositEditForm/BackOfficeDepositEditForm';
import BackOfficeTable from 'components/organisms/BackOfficeTable/BackOfficeTable';
import { tableHead } from 'constants/productTableHead';
import { useProductFilters } from 'hooks/useProductFilters';
import { useProductManage } from 'hooks/useProductManage';
import { IBackOfficeErrorData } from 'models/IError';
import { DepositBackendData } from 'models/IProductInfo';

const BackOfficeViewProductsPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });
  const { control } = useForm();
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

  const { data, isLoading } = useGetDepositsQuery({
    page: state.page,
    size: state.pageSize,
  });

  const [deleteDeposit, { isLoading: isDeleteLoading, isError }] =
    useDeleteDepositMutation();

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

  const {
    productSubtypes,
    productTypes,
    setProductSubtypes,
    setProductTypes,
    handleFilterChange,
    filteredTableBody,
  } = useProductFilters(mappedData);

  const handleDeleteApi = async (product: Partial<TableData> | undefined) => {
    if (product?.productName === 'Deposit') {
      try {
        await deleteDeposit(product.id).unwrap();
        handleDeleteSuccess();
      } catch (e) {
        handleDeleteError(e as IBackOfficeErrorData);
      }
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <MainContainer
        blur={state.isEditFormVisible || state.isDepositFormVisible}
      >
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
          tableBody={filteredTableBody()}
          totalItems={data?.page.totalElements || 0}
          page={state.page}
          pageSize={state.pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onDeleteClick={handleDelete}
          onEditClick={handleEdit}
          isLoading={isLoading}
        />
        {state.isDeleteVisible && (
          <BackOfficeWarningWindow
            sx={{ top: '290px', left: '100px' }}
            product={state.selectedProduct}
            onCancelClick={closeDeleteWindow}
            onDeleteClick={handleDeleteApi}
            title={state.warningTitle}
            text={state.warningBody}
            isLoading={isDeleteLoading}
            isError={isError}
            errorMessage={state.errorMessage}
          />
        )}
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
        />
      )}
      {state.isConfirmationWindowVisible && (
        <BackOfficeConfirmationWindow
          sx={{ top: '40px', left: '200px' }}
          onClose={closeConfirmationWindow}
          title={state.confirmationTitle}
          body={state.confirmationBody}
        />
      )}
    </Box>
  );
};

export default BackOfficeViewProductsPage;
