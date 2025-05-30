import { ITransferForm } from '../TransferForm';

import {
  ITransferRequestCard,
  ITransferRequestIBAN,
  useTransferToCardMutation,
  useTransferToIBANMutation,
} from 'api/accountsApi';
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
      } as ITransferRequestIBAN;

      return transferToIBAN(requestData);
    } else {
      const requestData = {
        senderCardNumber: formData.fromAccount,
        recipientCardNumber: formData.toAccount,
        amount: formData.amount,
        currency: formData.currency,
        message: formData.message,
      } as ITransferRequestCard;

      return transferToCard(requestData);
    }
  };

  return { transferFunds, isLoading, isError, isSuccess };
}
