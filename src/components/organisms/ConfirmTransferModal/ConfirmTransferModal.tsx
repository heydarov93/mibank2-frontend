import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Fade,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ITransferForm } from '../TransferForm/TransferForm';
import { useTranslations } from '../TransferForm/hooks/useTranslations';

import {
  StyledCloseButton,
  StyledModal,
  StyledModalContent,
  StyledTitle,
  StyledInputField,
  StyledInputLabel,
  StyledFormControlLabel,
} from './ConfirmTransferModal.styled';

import { useGetTransferFeeQuery } from 'api/accountsApi';
import { TransferDetailRow } from 'components/molecules';
import { TTransferMethod } from 'pages/TransfersPage/TransfersPage';
import { formatTransferValue } from 'utils/currencyUtils';
import { savePaymentSchema, TSavePaymentValues } from 'validation';

interface ConfirmTransferModalProps {
  open: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  transferInfo: ITransferForm;
  isTransferring: boolean;
  transferMethod: TTransferMethod;
}

export const ConfirmTransferModal = ({
  open,
  onClose,
  onConfirm,
  transferInfo,
  isTransferring,
  transferMethod,
}: ConfirmTransferModalProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const translation = useTranslations(transferMethod);

  const {
    data: feeData,
    isLoading,
    isSuccess,
    isError,
  } = useGetTransferFeeQuery({
    amount: transferInfo.amount,
    transferType: transferMethod === 'iban' ? 'iban' : 'card',
    isInternal: transferMethod === 'owncards',
  });
  const fee =
    feeData &&
    formatTransferValue(transferInfo.currency, feeData.fee as number);
  const totalAmount =
    feeData && formatTransferValue(transferInfo.currency, feeData.totalAmount);

  const [shouldSavePayment, setSavePayment] = useState<boolean>(false);

  const {
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<TSavePaymentValues>({
    resolver: yupResolver(savePaymentSchema),
    defaultValues: { paymentName: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  function onSubmit() {
    onConfirm();
    // TODO handle "payment name" request here
  }

  const SavePaymentCheckbox = () => (
    <Checkbox
      checked={shouldSavePayment}
      onChange={(e) => {
        setSavePayment(e.target.checked);
        if (errors.paymentName) {
          reset();
        }
      }}
    />
  );

  const PaymentNameField = () => (
    <Box marginTop={2}>
      <StyledInputLabel>{t('transferModal.paymentNameLabel')}</StyledInputLabel>
      <Controller
        name="paymentName"
        control={control}
        render={({ field }) => (
          <StyledInputField
            {...field}
            fullWidth
            variant="outlined"
            size="small"
            placeholder={t('transferModal.paymentNamePlaceholder')}
            error={!!errors.paymentName}
            helperText={errors.paymentName?.message}
          />
        )}
      />
    </Box>
  );

  return (
    <>
      <Backdrop
        sx={(theme) => ({
          color: theme.palette.common.white,
          zIndex: theme.zIndex.modal + 1,
          backdropFilter: 'blur(1px)',
        })}
        open={isTransferring}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <StyledModal open={open} onClose={onClose}>
        <Fade in={open}>
          <StyledModalContent elevation={3}>
            <StyledCloseButton onClick={onClose} data-testid="close-icon">
              <CloseIcon />
            </StyledCloseButton>
            <StyledTitle variant="h3" data-testid="modal-title">
              {t('transferModal.title')}
            </StyledTitle>
            <Stack gap={2} marginBlock={4}>
              <TransferDetailRow
                label={translation.fromAccount.label}
                value={transferInfo.fromAccount}
              />
              <TransferDetailRow
                label={translation.toAccount.label}
                value={transferInfo.toAccount}
              />
              <TransferDetailRow
                label={translation.amount.label}
                value={formatTransferValue(
                  transferInfo.currency,
                  Number(transferInfo.amount),
                )}
              />
              <TransferDetailRow
                label={t('transferModal.fee')}
                value={
                  <>
                    {isLoading && <CircularProgress size={16} />}
                    {isSuccess && fee}
                    {isError && t('transferModal.feeError')}
                  </>
                }
              />
              {transferInfo.message && (
                <TransferDetailRow
                  label={translation.message.label}
                  value={transferInfo.message}
                />
              )}
            </Stack>
            <TransferDetailRow
              label={t('transferModal.totalAmount')}
              value={
                <>
                  {isLoading && <CircularProgress size={20} />}
                  {isSuccess && totalAmount}
                  {isError && t('transferModal.totalAmountError')}
                </>
              }
              isTotalRow={true}
            />

            <StyledFormControlLabel
              control={<SavePaymentCheckbox />}
              label={t('transferModal.paymentNameLabel')}
            />

            {shouldSavePayment && <PaymentNameField />}

            <Stack
              direction="row"
              gap={2}
              marginTop={4}
              justifyContent="flex-end"
            >
              <Button variant="outlined" color="primary" onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button
                disabled={!(isValid || !shouldSavePayment) || isError}
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                {t('confirm')}
              </Button>
            </Stack>
          </StyledModalContent>
        </Fade>
      </StyledModal>
    </>
  );
};
