import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  StyledHeader,
  StyledLabel,
} from './DepositEditForm.styled';

import { useUpdateDepositMutation } from 'api/services/deposit-service/deposits.api';
import { useGetProductsQuery } from 'api/services/deposit-service/products.api';
import { InputField, CloseButton } from 'components/atoms';
import { CustomAutocomplete } from 'components/molecules';
import { SUPPORTED_CURRENCIES } from 'constants/data/currencies';
import { EErrorStatus } from 'enums';
import { IBackOfficeErrorData } from 'models/IError';
import { ITableData } from 'models/ITable';
import { THttpStatus } from 'types/types';
import { editDepositSchema, TEditDepositValues } from 'validation';

type RefetchProductsFn = ReturnType<typeof useGetProductsQuery>['refetch'];

interface DepositEditFormProps {
  formData?: Partial<ITableData>;
  onClose: () => void;
  onError: (errorMessage: string) => void;
  onSuccess?: () => void;
  refetchProducts?: RefetchProductsFn;
}

export const DepositEditForm = ({
  formData,
  onClose,
  onSuccess,
  onError,
  refetchProducts,
}: DepositEditFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TEditDepositValues>({
    resolver: yupResolver(editDepositSchema),
    mode: 'all',
    defaultValues: {
      name: formData?.productName || '',
      description: formData?.cardDescription || '',
      currency: formData?.cardCurrency || 'PLN',
      min: formData?.minimumDepositSum || '',
      max: formData?.maximumDepositSum || '',
      term: formData?.depositTerm || '',
      interestRate: formData?.depositInterestRate || '',
      capitalization: formData?.depositCapitalizationRate || '',
      earlyWithdrawalLimit: formData?.earlyWithdrawalLimit || '',
      earlyWithdrawalFee: formData?.withdrawalFee || '',
    },
  });

  const [updateDeposit, { isLoading }] = useUpdateDepositMutation();

  const onSubmit = async (data: TEditDepositValues) => {
    try {
      if (formData?.id === undefined) {
        throw new Error('Deposit ID is missing');
      }
      const payload = {
        id: formData.id,
        name: data.name,
        description: data.description,
        currency: data.currency,
        min: Number(data.min),
        max: Number(data.max),
        term: Number(data.term),
        interestRate: Number(data.interestRate),
        capitalization: Number(data.capitalization),
        earlyWithdrawalLimit: Number(data.earlyWithdrawalLimit),
        earlyWithdrawalFee: Number(data.earlyWithdrawalFee),
      };
      await updateDeposit(payload).unwrap();
      if (onSuccess) {
        refetchProducts?.();
        onSuccess();
      }
    } catch (e) {
      const error = e as IBackOfficeErrorData;
      if (error.originalStatus && typeof error.originalStatus === 'number') {
        switch (error.originalStatus as THttpStatus) {
          case EErrorStatus.UNAUTHORIZED:
            onError(t('GeneralErrors.errorUnauthorized'));
            break;
          case EErrorStatus.SERVER_ERROR:
            onError(t('GeneralErrors.serverError'));
            break;
          case EErrorStatus.NOT_FOUND:
            onError(t('GeneralErrors.notFound'));
            break;
          default:
            onError(t('GeneralErrors.generalError'));
        }
      } else {
        onError(t('GeneralErrors.generalError'));
      }
    }
  };

  return (
    <StyledContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledHeader>{t('depositEditForm.editDep')}</StyledHeader>
        <CloseButton onClick={onClose} />
      </Box>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box>
          <StyledLabel>{t('depositEditForm.depName')}</StyledLabel>
          <InputField
            name="name"
            id="productName"
            control={control}
            placeholder={t('depositEditForm.depName')}
            error={errors.name}
            helperText={errors.name?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depDesc')}</StyledLabel>
          <InputField
            name="description"
            id="cardDescription"
            control={control}
            placeholder={t('depositEditForm.depDesc')}
            error={errors.description}
            helperText={errors.description?.message}
            multiline
            rows={4}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depCurr')}</StyledLabel>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <CustomAutocomplete
                {...field}
                options={[...SUPPORTED_CURRENCIES]}
                onChange={(_, value) => field.onChange(value)}
                value={field.value}
                error={!!errors.currency}
                helperText={errors.currency?.message}
              />
            )}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.minDep')}</StyledLabel>
          <InputField
            name="min"
            id="minimumDepositSum"
            control={control}
            placeholder={t('depositEditForm.minDep')}
            error={errors.min}
            helperText={errors.min?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.maxDep')}</StyledLabel>
          <InputField
            name="max"
            id="maximumDepositSum"
            control={control}
            placeholder={t('depositEditForm.maxDep')}
            error={errors.max}
            helperText={errors.max?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depTerm')}</StyledLabel>
          <InputField
            name="term"
            id="depositTerm"
            control={control}
            placeholder={t('depositEditForm.depTerm')}
            error={errors.term}
            helperText={errors.term?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depInt')}</StyledLabel>
          <InputField
            name="interestRate"
            id="depositInterestRate"
            control={control}
            placeholder={t('depositEditForm.depInt')}
            error={errors.interestRate}
            helperText={errors.interestRate?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depCap')}</StyledLabel>
          <InputField
            name="capitalization"
            id="depositCapitalizationRate"
            control={control}
            placeholder={t('depositEditForm.depCap')}
            error={errors.capitalization}
            helperText={errors.capitalization?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.earlyWd')}</StyledLabel>
          <InputField
            name="earlyWithdrawalLimit"
            id="earlyWithdrawalLimit"
            control={control}
            placeholder={t('depositEditForm.earlyWd')}
            error={errors.earlyWithdrawalLimit}
            helperText={errors.earlyWithdrawalLimit?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.wdFee')}</StyledLabel>
          <InputField
            name="earlyWithdrawalFee"
            id="withdrawalFee"
            control={control}
            placeholder={t('depositEditForm.wdFee')}
            error={errors.earlyWithdrawalFee}
            helperText={errors.earlyWithdrawalFee?.message}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '24px',
            height: '56px',
          }}
        >
          {isLoading && <CircularProgress sx={{ alignSelf: 'center' }} />}
          <Button variant="outlined" type="button" onClick={onClose}>
            {t('depositEditForm.cancel')}
          </Button>
          <Button variant="contained" type="submit" disabled={!isValid}>
            {t('depositEditForm.saveChanges')}
          </Button>
        </Box>
      </form>
    </StyledContainer>
  );
};
