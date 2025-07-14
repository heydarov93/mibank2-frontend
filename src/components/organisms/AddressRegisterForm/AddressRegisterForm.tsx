import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import {
  StyledBackButton,
  StyledBackButtonText,
  StyledButton,
  StyledRegisterForm,
  StyledFormContent,
  StyledFormHeader,
  StyledFormTitle,
  StyledFormContainer,
} from './AddressRegisterForm.styled';
import { useAddressForm } from './hooks/useAddressForm';
import { CityField } from './molecules/CityField';
import { FormField } from './molecules/FormField';

import { NavigationWarningModal } from 'components/atoms';
import { TO_VERIFY_EMAIL } from 'constants/navigation/routePaths';
import { useNavigationWarning } from 'hooks';

export const AddressRegisterForm = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'BusinessLoginPage',
  });
  const location = useLocation();
  const onVerifyEmail = location.pathname === TO_VERIFY_EMAIL;
  const { handleSubmit, onSubmit, isValid, control } = useAddressForm();
  const {
    warningModalOpen,
    handleBackClick,
    handleNavigateBack,
    handleCancelNavigateBack,
  } = useNavigationWarning({ onVerifyEmail, redirectToSignIn: true });

  return (
    <>
      <StyledBackButton onClick={handleBackClick}>
        <KeyboardArrowLeftIcon
          sx={({ palette }) => ({
            color: palette.common.black,
          })}
        />
        <StyledBackButtonText>{t('backButton')}</StyledBackButtonText>
      </StyledBackButton>

      <StyledFormContainer>
        <StyledRegisterForm>
          <StyledFormHeader>
            <StyledFormTitle>{t('form.title')}</StyledFormTitle>
          </StyledFormHeader>

          <StyledFormContent onSubmit={handleSubmit(onSubmit)}>
            <FormField
              name="country"
              control={control}
              label={t('form.fields.country')}
              type="select"
              disabled
              options={[
                {
                  value: t('form.defaultCountryName'),
                  label: t('form.defaultCountryName'),
                },
              ]}
            />

            <CityField
              name="city"
              control={control}
              label={t('form.fields.city')}
              placeholder={t('form.fields.cityPlaceholder')}
            />

            <FormField
              name="street"
              control={control}
              label={t('form.fields.street')}
              placeholder={t('form.fields.streetPlaceholder')}
            />

            <Box sx={({ spacing }) => ({ display: 'flex', gap: spacing(2) })}>
              <FormField
                name="building"
                control={control}
                label={t('form.fields.building')}
                placeholder={t('form.fields.buildingPlaceholder')}
                containerStyle={{ width: '50%' }}
              />

              <FormField
                name="office"
                control={control}
                label={t('form.fields.office')}
                placeholder={t('form.fields.officePlaceholder')}
                containerStyle={{ width: '50%' }}
              />
            </Box>

            <FormField
              name="postcode"
              control={control}
              label={t('form.fields.postcode')}
              placeholder={t('form.fields.postcodePlaceholder')}
            />

            <StyledButton
              fullWidth
              type="submit"
              variant="contained"
              disabled={!isValid}
            >
              {t('form.submitButton')}
            </StyledButton>
          </StyledFormContent>
        </StyledRegisterForm>
      </StyledFormContainer>

      <NavigationWarningModal
        open={warningModalOpen}
        onConfirm={handleNavigateBack}
        onCancel={handleCancelNavigateBack}
        testId="warning-modal"
      />
    </>
  );
};
