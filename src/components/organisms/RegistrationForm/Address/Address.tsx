import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { SyntheticEvent } from 'react';
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

import { useGetPostcodeMutation } from 'api/getPostcode';
import { InputField, SubmitButton } from 'components/atoms';
import { CitySelectField } from 'components/molecules';
import { ALLOWED_KEYS } from 'constants/allowedKeys';
import { ErrorStatus } from 'enums';
import { EStepper } from 'enums/EStepper';
import { IErrorData } from 'models/IError';
import { IAddress } from 'models/IRegistration';
import { setError } from 'store/reducers';
import { setAddressData } from 'store/reducers/RegistrationSlice';
import { setStep } from 'store/reducers/StepperSlice';
import { validationAddressSchema } from 'validation';
interface IPostCodeAddress {
  postcode: string;
}
interface IPostCodeResponse {
  address: IPostCodeAddress | undefined;
}
export const Address = () => {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const [getPost] = useGetPostcodeMutation();

  const regExpPostcodeMask = /^(\d{2})(\d+)/;
  const regExpCitySearch = /^[a-zA-Z]+$/;
  const regExpPreventSpecialAndSpace = /^[a-zA-Z0-9]+$/;

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<IAddress>({
    resolver: yupResolver(validationAddressSchema),
    mode: 'all',
    defaultValues: {
      city: '',
      street: '',
      building: '',
      apartment: '',
      postcode: '',
    },
  });

  const getPostCode = async () => {
    const [city, street, building, apartment] = getValues([
      'city',
      'street',
      'building',
      'apartment',
      'postcode',
    ]);
    try {
      if (building && street && city && apartment) {
        const resp: IPostCodeResponse = await getPost({
          address: `${city} ${street} ${building} ${apartment} `,
        }).unwrap();
        if (resp.address?.postcode) {
          setValue('postcode', resp.address.postcode);
        } else {
          throw new Error('Invalid response from API');
        }
      }
    } catch (e) {
      const error = e as IErrorData;

      switch (error.status) {
        case ErrorStatus.NOT_FOUND:
          dispatch(setError(t('RegistrationPage.errorAddressFormat')));
          break;
        default:
          dispatch(setError(t('LoginPage.serverError')));
          break;
      }
    }
  };

  const onSubmit = (data: IAddress) => {
    dispatch(setAddressData(data));
    dispatch(setStep(EStepper.PERSONAL_INFO));
  };
  const inputMask = (value: SyntheticEvent): void => {
    const target = value.target as HTMLInputElement;

    const formatted = target.value.replace(regExpPostcodeMask, '$1-$2');
    target.value = formatted;
  };

  return (
    <StyledBoxContainer>
      <StyledFormTitle>{t('RegistrationPage.addressTitle')}</StyledFormTitle>
      <StyledForm>
        <StyledFormContent onBlur={getPostCode}>
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
                  !regExpCitySearch.test(e.key) &&
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
                onKeyDown={(e) => {
                  if (!regExpPreventSpecialAndSpace.test(e.key)) {
                    e.preventDefault();
                  }
                }}
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
                onKeyDown={(e) => {
                  if (!regExpPreventSpecialAndSpace.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="street">
              {t('RegistrationPage.inputName.labelPostcode')}
            </StyledLabel>
            <InputField
              name="postcode"
              id="postcode"
              control={control}
              placeholder={t('RegistrationPage.placeholder.postcodeField')}
              error={errors.postcode}
              className={errors.postcode ? 'shake' : ''}
              onChange={inputMask}
              maxLength={6}
            />
          </Box>
        </StyledFormContent>
        <SubmitButton
          isDisabled={!isValid}
          onClick={handleSubmit(onSubmit)}
          buttonContent={t('RegistrationPage.buttonLabelSaveAndProceed')}
        />
      </StyledForm>
    </StyledBoxContainer>
  );
};
