import {
  useTransferToCardMutation,
  useTransferToIBANMutation,
} from 'api/services/account-service/transfers.api';
import {
  ITransferToCardRequest,
  ITransferToIBANRequest,
} from 'api/services/account-service/types/transfers.types';
import { ITransferFormData } from 'models/ITransaction';
import { TTransferMethod } from 'types/types';

export const useTransferHandler = (method: TTransferMethod) => {
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

  const transferFunds = (formData: ITransferFormData) => {
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
};
