import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  StyledHeader,
  StyledLabel,
} from './BackOfficeDepositEditForm.styled';

import { InputField } from 'components/atoms';
import CloseButtonX from 'components/atoms/CloseButtonX/CloseButtonX';
import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import MiAutoComplete from 'components/molecules/MiAutoComplete/MiAutoComplete';
import currencies from 'constants/currencies';
import depositEditValidationSchema from 'validation/depositEditFormValidation';

interface FormState {
  depositName: string;
  depositDescription: string;
  depositCurrency: string;
  minimumDepositSum: string;
  maximumDepositSum: string;
  depositTermMonths: string;
  depositInterestRate: string;
  depositCapitalizationRate: string;
  earlyWithdrawalLimit: string;
  withdrawalFee: string;
}

interface BackOfficeDepositFormProps {
  formData?: Partial<TableData>;
  onClose: () => void;
}

const BackOfficeDepositEditForm = ({
  formData,
  onClose,
}: BackOfficeDepositFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  const {
    control,
    formState: { errors, isValid },
  } = useForm<FormState>({
    resolver: yupResolver(depositEditValidationSchema),
    mode: 'all',
    defaultValues: {
      depositName: formData?.productName || '',
      depositDescription: formData?.cardDescription || '',
      depositCurrency: formData?.cardCurrency || '',
      minimumDepositSum: formData?.minimumDepositSum || '',
      maximumDepositSum: formData?.maximumDepositSum || '',
      depositTermMonths: formData?.depositTerm || '',
      depositInterestRate: formData?.depositInterestRate || '',
      depositCapitalizationRate: formData?.depositCapitalizationRate || '',
      earlyWithdrawalLimit: formData?.earlyWithdrawalLimit || '',
      withdrawalFee: formData?.withdrawalFee || '',
    },
  });

  return (
    <StyledContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledHeader>{t('depositEditForm.editDep')}</StyledHeader>
        <CloseButtonX onClick={onClose} />
      </Box>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box>
          <StyledLabel>{t('depositEditForm.depName')}</StyledLabel>
          <InputField
            name="depositName"
            id="productName"
            control={control}
            placeholder={t('depositEditForm.depName')}
            error={errors.depositName}
            helperText={errors.depositName?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depDesc')}</StyledLabel>
          <InputField
            name="depositDescription"
            id="cardDescription"
            control={control}
            placeholder={t('depositEditForm.depDesc')}
            error={errors.depositDescription}
            helperText={errors.depositDescription?.message}
            multiline
            rows={4}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depCurr')}</StyledLabel>
          <Controller
            name="depositCurrency"
            control={control}
            render={({ field }) => (
              <MiAutoComplete
                {...field}
                options={currencies}
                onChange={(_, value) => field.onChange(value)}
                value={field.value}
                error={!!errors.depositCurrency}
                helperText={errors.depositCurrency?.message}
              />
            )}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.minDep')}</StyledLabel>
          <InputField
            name="minimumDepositSum"
            id="minimumDepositSum"
            control={control}
            placeholder={t('depositEditForm.minDep')}
            error={errors.minimumDepositSum}
            helperText={errors.minimumDepositSum?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.maxDep')}</StyledLabel>
          <InputField
            name="maximumDepositSum"
            id="maximumDepositSum"
            control={control}
            placeholder={t('depositEditForm.maxDep')}
            error={errors.maximumDepositSum}
            helperText={errors.maximumDepositSum?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depTerm')}</StyledLabel>
          <InputField
            name="depositTermMonths"
            id="depositTerm"
            control={control}
            placeholder={t('depositEditForm.depTerm')}
            error={errors.depositTermMonths}
            helperText={errors.depositTermMonths?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depInt')}</StyledLabel>
          <InputField
            name="depositInterestRate"
            id="depositInterestRate"
            control={control}
            placeholder={t('depositEditForm.depInt')}
            error={errors.depositInterestRate}
            helperText={errors.depositInterestRate?.message}
          />
        </Box>
        <Box>
          <StyledLabel>{t('depositEditForm.depCap')}</StyledLabel>
          <InputField
            name="depositCapitalizationRate"
            id="depositCapitalizationRate"
            control={control}
            placeholder={t('depositEditForm.depCap')}
            error={errors.depositCapitalizationRate}
            helperText={errors.depositCapitalizationRate?.message}
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
            name="withdrawalFee"
            id="withdrawalFee"
            control={control}
            placeholder={t('depositEditForm.wdFee')}
            error={errors.withdrawalFee}
            helperText={errors.withdrawalFee?.message}
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

export default BackOfficeDepositEditForm;
