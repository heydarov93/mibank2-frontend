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

import { SubmitButton } from 'components/atoms';
import { CitySelectField } from 'components/molecules';
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
            <StyledLabel htmlFor="passportNumber">
              {t('RegistrationPage.inputName.labelCity')}
            </StyledLabel>
            <CitySelectField
              name="city"
              control={control}
              error={errors?.city}
              className={errors.city ? 'shake' : ''}
            />
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
