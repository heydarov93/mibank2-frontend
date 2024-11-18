import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import {
  StyledFormTitle,
  StyledForm,
  StyledFormContent,
  StyledBoxContainer,
  StyledLabel,
} from './Address.styled';

import { InputField, SubmitButton } from 'components/atoms';
import { CitySelectField } from 'components/molecules';
import { ALLOWED_KEYS } from 'constants/allowedKeys';
import { IAddress } from 'models/IRegistration';
import { setAddressData } from 'store/reducers/RegistrationSlice';
import { validationAddressSchema } from 'validation';

export const Address = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<IAddress>({
    resolver: yupResolver(validationAddressSchema),
    mode: 'onBlur',
    defaultValues: {
      city: '',
      street: '',
      building: '',
      apartment: '',
    },
  });

  const onSubmit = (data: IAddress) => {
    dispatch(setAddressData(data));
  };

  return (
    <StyledBoxContainer>
      <StyledFormTitle>{t('RegistrationPage.addressTitle')}</StyledFormTitle>
      <StyledForm>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="city">
              {t('RegistrationPage.inputName.labelCity')}
            </StyledLabel>
            <CitySelectField
              name="city"
              control={control}
              error={errors.city}
              className={errors.city ? 'shake' : ''}
              onKeyDown={(e) => {
                if (
                  !/^[a-zA-Z]+$/.test(e.key) &&
                  !ALLOWED_KEYS.includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="street">
              {t('RegistrationPage.inputName.labelStreet')}
            </StyledLabel>
            <InputField
              name="street"
              id="street"
              control={control}
              placeholder={t('RegistrationPage.placeholder.name')}
              error={errors.street}
              className={errors.street ? 'shake' : ''}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 'inherit', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <StyledLabel htmlFor="building">
                {t('RegistrationPage.inputName.labelBuilding')}
              </StyledLabel>
              <InputField
                name="building"
                id="building"
                control={control}
                placeholder={t('RegistrationPage.placeholder.name')}
                error={errors.building}
                className={errors.building ? 'shake' : ''}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <StyledLabel htmlFor="apartment">
                {t('RegistrationPage.inputName.labelApartment')}
              </StyledLabel>
              <InputField
                name="apartment"
                id="apartment"
                control={control}
                placeholder={t('RegistrationPage.placeholder.name')}
                error={errors.apartment}
                className={errors.apartment ? 'shake' : ''}
              />
            </Box>
          </Box>
        </StyledFormContent>
        <SubmitButton
          isDisabled={!isValid}
          onClick={handleSubmit(onSubmit)}
          buttonContent={t('RegistrationPage.buttonLabelSaveAndProceed')}
        ></SubmitButton>
      </StyledForm>
    </StyledBoxContainer>
  );
};
