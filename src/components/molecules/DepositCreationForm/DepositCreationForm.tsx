import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Autocomplete,
  Box,
  InputAdornment,
  Switch,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  FormActionBtn,
  FormContainer,
  FormHeader,
  FormInterestBox,
  FormInterestLabel,
  FormInterestText,
  FormLabel,
  FormOpenDepositBtnBox,
  FormSubTitle,
  FormTermsLink,
  FormTermsRow,
  FormTermsText,
  FormTitle,
} from './DepositCreationForm.styled';

import { openDepositValidationSchema } from 'validation/validationOpenDepositSchema';

interface DepositCreationFormProps {
  accounts: string[];
  modal?: boolean;
  onCloseModal?: () => void;
  onBack: () => void;
}

export const DepositCreationForm = ({
  accounts,
  modal,
  onCloseModal,
  onBack,
}: DepositCreationFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  const {
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(openDepositValidationSchema),
    mode: 'all',
    defaultValues: {
      amount: undefined,
      account: '',
      checkbox: false,
    },
  });

  return (
    <FormContainer data-testid="deposit-creation-form">
      <FormHeader>
        <ArrowBackIosIcon
          onClick={onBack}
          sx={(theme) => ({
            width: '24px',
            height: '24px',
            color: theme.palette.grey[400],
            cursor: 'pointer',
          })}
        />
        <FormTitle>{t('openDeposit')}</FormTitle>
      </FormHeader>
      <FormSubTitle>{t('openDepositFormSubTitle')}</FormSubTitle>
      <form>
        <Box sx={{ marginBottom: '24px' }}>
          <FormLabel>{t('depositAmountLabel')}</FormLabel>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                inputProps={{ min: 0, pattern: 'd*' }}
                placeholder={t('depositAmountPlaceholder')}
                onBlur={field.onBlur}
                onChange={(e) => field.onChange(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {t('depositCurrencyLabel')}
                    </InputAdornment>
                  ),
                }}
                error={!!errors.amount}
                helperText={errors.amount?.message}
                sx={{ borderRadius: '8px' }}
              />
            )}
          />
        </Box>

        <Box sx={{ marginBottom: '24px' }}>
          <FormLabel>{t('selectAccountLabel')}</FormLabel>
          <Controller
            name="account"
            control={control}
            render={({ field }) => (
              <Autocomplete
                data-testid="account-select"
                options={accounts}
                value={field.value}
                onChange={(_, value) => field.onChange(value || '')}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t('selectAccountLabel')}
                    error={!!errors.account}
                    helperText={errors.account?.message}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                  />
                )}
                sx={{ borderRadius: '8px' }}
              />
            )}
          />
        </Box>

        <FormInterestBox>
          <FormInterestText>{t('calculationInfo')}</FormInterestText>
          <FormInterestLabel>{t('calculationResult')}</FormInterestLabel>
        </FormInterestBox>

        <Controller
          name="checkbox"
          control={control}
          render={({ field }) => (
            <FormTermsRow
              control={
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  size="medium"
                />
              }
              label={<FormTermsText>{t('confirmationText')}</FormTermsText>}
            />
          )}
        />

        <FormTermsLink>{t('termsLinkText')}</FormTermsLink>

        <FormOpenDepositBtnBox>
          {modal && (
            <FormActionBtn
              variant="outlined"
              sx={{ marginRight: '25px', width: '113px' }}
              onClick={onCloseModal}
            >
              {t('cancelDeposit')}
            </FormActionBtn>
          )}
          <FormActionBtn variant="contained" disabled={!isValid}>
            {t('openDeposit')}
          </FormActionBtn>
        </FormOpenDepositBtnBox>
      </form>
    </FormContainer>
  );
};
