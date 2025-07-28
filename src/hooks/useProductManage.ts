import { t } from 'i18next';
import { useState } from 'react';

import { HTTP_STATUS } from 'constants/business/httpStatus';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from 'constants/business/pagination';
import { IBackOfficeErrorData } from 'models/IError';
import { TableData } from 'models/ITableData';
import { THttpStatus } from 'types/types';

interface BackOfficeState {
  isDeleteVisible: boolean;
  selectedProduct: Partial<TableData>;
  confirmationTitle: string;
  confirmationBody: string;
  warningTitle: string;
  warningBody: string;
  isConfirmationWindowVisible: boolean;
  isEditFormVisible: boolean;
  isDepositFormVisible: boolean;
  formData: Partial<TableData>;
  page: number;
  pageSize: number;
  errorMessage: string;
}

export const useProductManage = () => {
  const initialState: BackOfficeState = {
    isDeleteVisible: false,
    selectedProduct: {},
    confirmationTitle: '',
    confirmationBody: '',
    warningTitle: '',
    warningBody: '',
    isConfirmationWindowVisible: false,
    isEditFormVisible: false,
    isDepositFormVisible: false,
    formData: {},
    page: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    errorMessage: '',
  };

  const [state, setState] = useState(initialState);

  const actions = {
    handleDelete: (product: Partial<TableData>) => {
      setState((prev) => ({
        ...prev,
        selectedProduct: product,
        warningTitle: t('BackOffice.warningWindow.deleteDeposit'),
        warningBody: t('BackOffice.warningWindow.deleteDepositText'),
        isDeleteVisible: true,
      }));
    },

    handleDeleteSuccess: () => {
      setState((prev) => ({
        ...prev,
        isDeleteVisible: false,
        isConfirmationWindowVisible: true,
        confirmationTitle: t('BackOffice.ConfirmationWindow.deleteTitle'),
        confirmationBody: t('BackOffice.ConfirmationWindow.deleteBody'),
      }));
    },

    handleDeleteError: (error: IBackOfficeErrorData) => {
      const errorMessage = actions.getErrorMessage(error);
      setState((prev) => ({
        ...prev,
        errorMessage,
      }));
    },

    handleEdit: (product: Partial<TableData>) => {
      setState((prev) => ({
        ...prev,
        formData: product,
        isEditFormVisible: product.productName === 'Card',
        isDepositFormVisible: product.productName !== 'Card',
      }));
    },

    handleSuccessfulUpdate: () => {
      setState((prev) => ({
        ...prev,
        isConfirmationWindowVisible: true,
        isDepositFormVisible: false,
        confirmationTitle: t('BackOffice.ConfirmationWindow.updateTitle'),
        confirmationBody: t('BackOffice.ConfirmationWindow.updateBody'),
      }));
    },

    handleError: (errorMessage: string) => {
      setState((prev) => ({
        ...prev,
        isDepositFormVisible: false,
        isDeleteVisible: true,
        warningBody: errorMessage,
        warningTitle: t('BackOffice.GeneralErrors.deleteFailed'),
      }));
    },

    handleClose: () => {
      setState((prev) => ({
        ...prev,
        isEditFormVisible: false,
        isDepositFormVisible: false,
      }));
    },

    handlePageChange: (newPage: number) => {
      setState((prev) => ({ ...prev, page: newPage }));
    },

    handlePageSizeChange: (newSize: number) => {
      setState((prev) => ({ ...prev, pageSize: newSize, page: 0 }));
    },

    closeDeleteWindow: () => {
      setState((prev) => ({ ...prev, isDeleteVisible: false }));
    },

    closeConfirmationWindow: () => {
      setState((prev) => ({ ...prev, isConfirmationWindowVisible: false }));
    },

    getErrorMessage: (error: IBackOfficeErrorData) => {
      if (error.originalStatus && typeof error.originalStatus === 'number') {
        switch (error.originalStatus as THttpStatus) {
          case HTTP_STATUS.Unauthorized:
            return t('BackOffice.GeneralErrors.errorUnauthorized');
          case HTTP_STATUS.ServerError:
            return t('BackOffice.GeneralErrors.serverError');
          case HTTP_STATUS.NotFound:
            return t('BackOffice.GeneralErrors.notFound');
          default:
            return t('BackOffice.GeneralErrors.generalError');
        }
      }
      return t('BackOffice.GeneralErrors.generalError');
    },
  };

  return { state, ...actions };
};
