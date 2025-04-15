import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Autocomplete,
  Box,
  InputAdornment,
  Switch,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  FormContainer,
  FormHeader,
  FormInterestBox,
  FormInterestLabel,
  FormInterestText,
  FormLabel,
  FormOpenDepositBtn,
  FormOpenDepositBtnBox,
  FormSubTitle,
  FormTermsLink,
  FormTermsRow,
  FormTermsText,
  FormTitle,
} from './DepositCreationForm.styled';

interface DepositCreationFormProps {
  accounts: string[];
}

export const DepositCreationForm = ({ accounts }: DepositCreationFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const isFormComplete = termsAccepted;

  return (
    <FormContainer>
      <FormHeader>
        <ArrowBackIosIcon sx={{ width: '24px', height: '24px' }} />
        <FormTitle>{t('openDeposit')}</FormTitle>
      </FormHeader>
      <FormSubTitle>{t('openDepositFormSubTitle')}</FormSubTitle>

      <Box sx={{ marginBottom: '24px' }}>
        <FormLabel>{t('depositAmountLabel')}</FormLabel>
        <TextField
          fullWidth
          value=""
          type="number"
          placeholder={t('depositAmountPlaceholder')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {t('depositCurrencyLabel')}
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: '8px',
          }}
        />
      </Box>

      <Box sx={{ marginBottom: '24px' }}>
        <FormLabel>{t('selectAccountLabel')}</FormLabel>
        <Autocomplete
          options={accounts}
          defaultValue=""
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} placeholder={t('selectAccountLabel')} />
          )}
          sx={{
            borderRadius: '8px',
          }}
        />
      </Box>

      <FormInterestBox>
        <FormInterestText>{t('calculationInfo')}</FormInterestText>
        <FormInterestLabel>{t('calculationResult')}</FormInterestLabel>
      </FormInterestBox>

      <FormTermsRow
        control={
          <Switch
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            size="medium"
          />
        }
        label={<FormTermsText>{t('confirmationText')}</FormTermsText>}
      />

      <FormTermsLink>{t('termsLinkText')}</FormTermsLink>

      <FormOpenDepositBtnBox>
        <FormOpenDepositBtn variant="contained" disabled={!isFormComplete}>
          {t('openDeposit')}
        </FormOpenDepositBtn>
      </FormOpenDepositBtnBox>
    </FormContainer>
  );
};
