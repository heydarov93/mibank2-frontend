import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  AlertProps,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { ConfirmTransferModal } from '../ConfirmTransferModal/ConfirmTransferModal';
import { PaymentReceiptModal } from '../PaymentReceiptModal/PaymentReceiptModal';

import {
  StyledArrowIcon,
  StyledButtonsContainer,
  StyledForm,
  StyledLabel,
} from './TransferForm.styled';
import { CurrencySelectControlled } from './atoms/CurrencySelectControlled';
import {
  ISavedCardAccount,
  ISavedIBANAccount,
  useAccounts,
} from './hooks/useAccounts';
import { useTransfer } from './hooks/useTransfer';
import { useTranslations } from './hooks/useTranslations';
import {
  IUserCardAccountOption,
  IUserIBANAccountOption,
} from './interfaces/IUserAccountOption';
import { AutocompleteField } from './molecules/AutocompleteField';
import { CardFieldAdornment } from './molecules/CardFieldAdornment';
import { TransferAlertDialog } from './molecules/TransferAlertDialog/TransferAlertDialog';
import { createOptions } from './utils/createOptions';
import { renderOption } from './utils/renderOptions';

import { InputFieldControlled, NumericInput } from 'components/molecules';
import { IPaymentReceipt } from 'components/molecules/PaymentReceiptInfo/PaymentReceiptInfo';
import { CARD_PATTERN, IBAN_PATTERN } from 'constants/inputPatterns';
import { IErrorData } from 'models/IError';
import { TTransferMethod } from 'pages/TransfersPage/TransfersPage';
import { TCurrency } from 'types/card';
import { schema } from 'validation/transferFormSchema';

export interface ITransferForm {
  fromAccount: string;
  toAccount: string;
  amount: string;
  currency: TCurrency;
  message?: string;
}

interface ITransferFormProps {
  onCancel: () => void;
}

export function TransferForm({ onCancel }: ITransferFormProps) {
  const [searchParams] = useSearchParams();
  const transferMethod = searchParams.get('method') as TTransferMethod;
  const isMethodIBAN = transferMethod === 'iban';
  const isMethodOwnCards = transferMethod === 'owncards';

  const [receiptInfo, setReceiptInfo] = useState<IPaymentReceipt>();
  const [transferInfo, setTransferInfo] = useState<ITransferForm>();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    type: AlertProps['severity'];
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    message: '',
  });

  const {
    control,
    getValues,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<ITransferForm>({
    resolver: yupResolver(schema(transferMethod)),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { fromAccounts, toAccounts } = useAccounts(transferMethod);
  const { transferFunds, isLoading } = useTransfer(transferMethod);
  const translation = useTranslations(transferMethod);
  const inputPattern = isMethodIBAN ? IBAN_PATTERN : CARD_PATTERN;

  const fromAccountsOptions = createOptions(fromAccounts ?? []);
  const toAccountsOptions = toAccounts.map((account) => account);

  const watchedFromAccount = watch('fromAccount');
  const watchedToAccount = watch('toAccount');

  const getOptionDisabledFromAccounts = (
    option: IUserCardAccountOption | IUserIBANAccountOption,
  ) => option.number === watchedToAccount;
  const getOptionDisabledToAccounts = (
    option: ISavedCardAccount | ISavedIBANAccount,
  ) => option.number === watchedFromAccount;

  async function onSubmit() {
    try {
      const formData = getValues();
      const response = await transferFunds(formData).unwrap();
      // TODO: replace placeholders with real data
      const receiptInfo: IPaymentReceipt = {
        payerName: 'Grzegorz Brzeczyszczykiewicz',
        fromAccount: formData.fromAccount,
        toAccount: formData.toAccount,
        amount: formData.amount,
        currency: formData.currency,
        date: '2025-05-29T19:27:28.613Z',
        fee: response.fee,
        totalAmount: response.totalDeduction,
        transferMethod: transferMethod === 'iban' ? 'iban' : 'card',
      };
      setReceiptInfo(receiptInfo);
      handleConfirmClose();
      setAlert({ isOpen: true, type: 'success', message: '' });
    } catch (e) {
      const error = e as IErrorData;
      setAlert({
        isOpen: true,
        type: 'error',
        message: error.data.exceptionMessage,
      });
    }
  }

  function handleShowConfirmation(formData: ITransferForm) {
    setTransferInfo(formData);
    setConfirmOpen(true);
  }

  function handleConfirmClose() {
    setConfirmOpen(false);
  }

  function handleAlertClose() {
    setAlert((s) => ({ ...s, isOpen: false }));
  }

  function handleViewReceipt() {
    handleAlertClose();
    handleConfirmClose();
    setReceiptOpen(true);
  }

  function handleCloseReceipt() {
    setReceiptOpen(false);
  }

  return (
    <>
      {transferInfo && (
        <ConfirmTransferModal
          key={transferInfo.amount}
          onConfirm={onSubmit}
          onClose={handleConfirmClose}
          open={confirmOpen}
          transferInfo={transferInfo}
          isTransferring={isLoading}
          transferMethod={transferMethod}
        />
      )}
      {receiptInfo && (
        <PaymentReceiptModal
          open={receiptOpen}
          onClose={handleCloseReceipt}
          receiptInfo={receiptInfo}
        />
      )}
      <TransferAlertDialog
        open={alert.isOpen}
        type={alert.type}
        message={alert.message}
        onClose={handleAlertClose}
        onViewReceipt={handleViewReceipt}
      />

      <StyledForm onSubmit={handleSubmit(handleShowConfirmation)}>
        <Box gridColumn={1} gridRow={1}>
          <StyledLabel htmlFor="fromAccount">
            {translation.fromAccount.label}
          </StyledLabel>
          <AutocompleteField<
            IUserCardAccountOption | IUserIBANAccountOption,
            ITransferForm
          >
            name="fromAccount"
            control={control}
            options={fromAccountsOptions}
            pattern={inputPattern}
            renderOption={renderOption}
            getOptionDisabled={getOptionDisabledFromAccounts}
            textFieldProps={{
              error: !!errors.fromAccount,
              helperText: errors.fromAccount?.message ?? '',
              placeholder: translation.fromAccount.placeholder,
              InputProps: {
                startAdornment: !isMethodIBAN && watchedFromAccount && (
                  <CardFieldAdornment
                    options={fromAccountsOptions as IUserCardAccountOption[]}
                    selectedValue={watchedFromAccount}
                  />
                ),
              },
            }}
          />
        </Box>
        <Box gridColumn={1} gridRow={2}>
          <StyledLabel htmlFor="amount">{translation.amount.label}</StyledLabel>
          <InputFieldControlled
            name="amount"
            control={control}
            textFieldProps={{
              error: !!errors.amount,
              helperText: errors.amount?.message ?? '',
              placeholder: translation.amount.placeholder,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <CurrencySelectControlled
                      name="currency"
                      control={control}
                    />
                  </InputAdornment>
                ),
                sx: { paddingRight: 0.5 },
                inputComponent: NumericInput as never,
              },
              sx: (theme) => ({
                fieldset: {
                  border: `1px solid ${theme.palette.border.lightBlue}`,
                },
              }),
            }}
          />
          {isMethodOwnCards && (
            <FormControlLabel
              control={<Checkbox />}
              label={translation.transferAll}
            />
          )}
        </Box>
        {!isMethodOwnCards && (
          <Box gridColumn={1} gridRow={3}>
            <StyledLabel htmlFor="message">
              {translation.message.label}
            </StyledLabel>
            <InputFieldControlled
              name="message"
              control={control}
              textFieldProps={{
                error: !!errors.message,
                helperText: errors.message?.message ?? '',
                placeholder: translation.message.placeholder,
                sx: (theme) => ({
                  fieldset: {
                    border: `1px solid ${theme.palette.border.lightBlue}`,
                  },
                }),
              }}
            />
          </Box>
        )}

        <StyledArrowIcon color="disabled">
          <ArrowForwardIcon />
        </StyledArrowIcon>

        <Box gridColumn={2} gridRow={1}>
          <StyledLabel htmlFor="toAccount">
            {translation.toAccount.label}
          </StyledLabel>
          <AutocompleteField
            name="toAccount"
            control={control}
            options={toAccountsOptions}
            pattern={inputPattern}
            renderOption={renderOption}
            getOptionDisabled={getOptionDisabledToAccounts}
            textFieldProps={{
              error: !!errors.toAccount,
              helperText: errors.toAccount?.message ?? '',
              placeholder: translation.toAccount.placeholder,
              InputProps: {
                startAdornment: !isMethodIBAN && (
                  <CardFieldAdornment
                    options={toAccounts as ISavedCardAccount[]}
                    selectedValue={watchedToAccount}
                  />
                ),
              },
            }}
          />
        </Box>

        <StyledButtonsContainer gridColumn={1} gridRow={4}>
          <Button variant="outlined" size="large" onClick={onCancel}>
            {translation.cancel}
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            {translation.submit}
          </Button>
        </StyledButtonsContainer>
      </StyledForm>
    </>
  );
}
