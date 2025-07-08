import { ITransferForm } from '../TransferForm';

import {
  useTransferToCardMutation,
  useTransferToIBANMutation,
} from 'api/services/account-service/transfers.api';
import {
  ITransferToCardRequest,
  ITransferToIBANRequest,
} from 'api/services/account-service/types/transfers.types';
import { TTransferMethod } from 'pages/TransfersPage/TransfersPage';

export function useTransfer(method: TTransferMethod) {
  const [
    transferToIBAN,
    {
      isLoading: isIBANLoading,
      isError: isIBANError,
      isSuccess: isIBANSuccess,
    },
  ] = useTransferToIBANMutation();
  const [
    transferToCard,
    {
      isLoading: isCardLoading,
      isError: isCardError,
      isSuccess: isCardSuccess,
    },
  ] = useTransferToCardMutation();

  const isLoading = isIBANLoading || isCardLoading;
  const isError = isIBANError || isCardError;
  const isSuccess = isIBANSuccess || isCardSuccess;

  const transferFunds = (formData: ITransferForm) => {
    if (method === 'iban') {
      const requestData = {
        senderIbanNumber: formData.fromAccount,
        recipientIbanNumber: formData.toAccount,
        amount: formData.amount,
        currency: formData.currency,
        message: formData.message,
      } as ITransferToIBANRequest;

      return transferToIBAN(requestData);
    } else {
      const requestData = {
        senderCardNumber: formData.fromAccount,
        recipientCardNumber: formData.toAccount,
        amount: formData.amount,
        currency: formData.currency,
        message: formData.message,
      } as ITransferToCardRequest;

      return transferToCard(requestData);
    }
  };

  return { transferFunds, isLoading, isError, isSuccess };
}
