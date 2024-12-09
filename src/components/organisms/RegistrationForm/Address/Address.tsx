import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { SyntheticEvent, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  StyledFormTitle,
  StyledForm,
  StyledFormContent,
  StyledBoxContainer,
  StyledLabel,
} from './Address.styled';

import { useGetPostcodeMutation } from 'api/getPostcode';
import { usePostRegistrationInfoMutation } from 'api/postRegistrationInfoApi';
import { InputField, SubmitButton, SecondaryButton } from 'components/atoms';
import { CitySelectField } from 'components/molecules';
import { ALLOWED_KEYS } from 'constants/allowedKeys';
import { TO_HOME } from 'constants/routesName';
import { ErrorStatus } from 'enums';
import { EStepper } from 'enums/EStepper';
import { IErrorData } from 'models/IError';
import { IAddress } from 'models/IRegistration';
import { IRegistrationForApi } from 'models/IRegistrationForApi';
import { setError } from 'store/reducers';
import { setAddressData } from 'store/reducers/RegistrationSlice';
import { setStep } from 'store/reducers/StepperSlice';
import {
  getAddressData,
  getDocumentInfoData,
  getEUDocumentInfoData,
  getLegalStatusData,
  getPersonalInfoData,
  getPhoneCode,
} from 'store/selectors/RegistrationSelectors';
import { getEU } from 'store/selectors/StepperSelectors';
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
  const isEU = useSelector(getEU) ? 'EU' : 'NON_EU';
  const personalInfoData = useSelector(getPersonalInfoData);
  const legalInfoData = useSelector(getLegalStatusData);
  const addressData = useSelector(getAddressData);
  const [postRegistrationInfo] = usePostRegistrationInfoMutation();
  const navigate = useNavigate();

  const codePhone = useSelector(getPhoneCode);
  const documentInfoData = useSelector(getEU)
    ? useSelector(getEUDocumentInfoData)
    : useSelector(getDocumentInfoData);

  const regExpPostcodeMask = /^(\d{2})(\d+)/;
  const regExpCitySearch = /^[a-zA-Z]+$/;
  const regExpPreventSpecialAndSpace = /^[a-zA-Z0-9]+$/;
  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
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

  const formatPostalCode = (postalCode: string): string => {
    return postalCode?.slice(0, 2) + '-' + postalCode.slice(2);
  }

  useEffect(() => {
    reset({
      city: addressData.city,
      street: addressData.street,
      building: addressData.building,
      apartment: addressData.apartment,
      postcode: addressData.postcode ? formatPostalCode(addressData.postcode) : '',
    });
  }, [addressData, reset]);

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

  const onPreviousForm = async () => {
    const [city, street, building, apartment, postcode] = getValues([
      'city',
      'street',
      'building',
      'apartment',
      'postcode',
    ]);
    await dispatch(setAddressData({
      city: city,
      street: street,
      building: building,
      apartment: apartment,
      postcode: postcode,
    }));
    dispatch(setStep(EStepper.DOCUMENT_INFO));
  };
  const postcodeInputMask = (value: SyntheticEvent): void => {
    const target = value.target as HTMLInputElement;
    const formatted = target.value.replace(regExpPostcodeMask, '$1-$2');
    target.value = formatted;
  };

  const createDataForApi = () => {
    const data: IRegistrationForApi = {
      personalInfo: {
        firstName: personalInfoData.name,
        lastName: personalInfoData.surname,
        citizenship: legalInfoData.citizenship,
        phoneNumber: String(personalInfoData.phoneNumber), //unique
        phoneCode: codePhone,
        taxResidenceCountry: legalInfoData.taxResidenceCountry,
        pesel: legalInfoData.peselNumber, // unuque
        birthDate: personalInfoData.dateOfBirth,
      },
      address: {
        city: addressData.city,
        street: addressData.street,
        building: addressData.building,
        apartment: addressData.apartment,
        postCode: addressData.postcode,
      },

      document: {
        number: documentInfoData.documentNumber, //unique
        issueDate: documentInfoData.issueDate,
        expiryDate: documentInfoData.expirationDate,
        documentType: isEU,
      },
      registrationDate: dayjs().format('YYYY-MM-DD'),
      email: localStorage.getItem('email') || '',
      accessToken: localStorage.getItem('accessToken') || '',
    };
    return data;
  };

  const postRegistrationInfoFunction = async (data: IRegistrationForApi) => {
    try {
      if (data) {
        await postRegistrationInfo(data);
      } else {
        throw new Error("You don't have data");
      }
    } catch (e) {
      const error = e as IErrorData;
      switch (error.status) {
        case ErrorStatus.SERVER_ERROR:
          dispatch(setError(t('RegistrationPage.errorServerUnacceptable')));
          break;
        case ErrorStatus.BAD_REQUEST:
          dispatch(setError(t('RegistrationPage.errorBadRequest')));
          break;
        default:
          dispatch(setError(t('LoginPage.serverError')));
          break;
      }
    }
  };

  const formSubmitted = useRef(false);

  const onSubmit = async (data: IAddress) => {
    formSubmitted.current = true;
    await dispatch(setAddressData(data));
  };

  useEffect(() => {
    if (formSubmitted.current && addressData) {
      const apiData = createDataForApi();
      postRegistrationInfoFunction(apiData);
      navigate(TO_HOME);
    }
  }, [addressData]);

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
            <StyledLabel htmlFor="postcode">
              {t('RegistrationPage.inputName.labelPostcode')}
            </StyledLabel>
            <InputField
              name="postcode"
              id="postcode"
              control={control}
              placeholder={t('RegistrationPage.placeholder.postcodeField')}
              error={errors.postcode}
              className={errors.postcode ? 'shake' : ''}
              onChange={postcodeInputMask}
              maxLength={6}
            />
          </Box>
        </StyledFormContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SecondaryButton
            onClick={onPreviousForm}
            buttonContent={t('RegistrationPage.buttonBackArrow')}
          />
          <SubmitButton
            isDisabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            buttonContent={t('RegistrationPage.buttonLabelSaveAndProceed')}
          />
        </Box>
      </StyledForm>
    </StyledBoxContainer>
  );
};
