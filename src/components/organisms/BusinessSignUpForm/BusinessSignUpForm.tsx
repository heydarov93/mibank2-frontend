import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledForm,
  StyledFormTitle,
  StyledLabel,
} from './BusinessSignUpForm.styled';

import { usePostValidationLegalEntityInfoMutation } from 'api/services/user-account-service/user-accounts.api';
import { InputField, SubmitButton } from 'components/atoms';
import { PatternFieldControlled } from 'components/molecules';
import { TO_BUSINESS_CREATE_PASSWORD } from 'constants/navigation/routePaths';
import { LOCAL_STORAGE_KEYS } from 'constants/security/storageAuthKeys';
import { NIP_PATTERN } from 'constants/validation/patterns';
import { EErrorStatus } from 'enums';
import { useAppDispatch } from 'hooks';
import { ILegalEntityValidationError } from 'models/IError';
import { setError, setLegalEntityInfo } from 'store/reducers/AuthSlice';
import { businessSignupSchema, TBusinessSignupValues } from 'validation';

// import { ComponentPropsToStylePropsMap } from '@aws-amplify/ui-react';

interface IBusinessSignUpForm {
  companyName: string;
  companyEmail: string;
  nip: string;
  ownerName: string;
}

export const BusinessSignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', {
    keyPrefix: 'BusinessSignUpPage',
  });

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isValid },
    setError: setFormError,
  } = useForm<TBusinessSignupValues>({
    resolver: yupResolver(businessSignupSchema),
    mode: 'onChange',
    defaultValues: {
      companyName: '',
      companyEmail: '',
      nip: '',
      ownerName: '',
    },
  });
  // TODO: substitute with real submit when BE is ready
  const [postValidationLegalEntityInfo] =
    usePostValidationLegalEntityInfoMutation();

  const onSubmit = async (data: IBusinessSignUpForm) => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.LegalEntityValues,
        JSON.stringify(data),
      );
      const response = {
        isEmailAlreadyTaken: false,
        isNipAlreadyTaken: false,
      };
      // const response: { string: boolean } =
      //   await postValidationLegalEntityInfo(data).unwrap();

      const existCheck = Object.entries(response).filter(
        ([, isExist]: [string, boolean]) => isExist === true,
      );
      if (existCheck.length) {
        throw {
          status: EErrorStatus.BAD_REQUEST,
          existError: existCheck,
        };
      }
      dispatch(setLegalEntityInfo(data));
      navigate(TO_BUSINESS_CREATE_PASSWORD, {
        state: { email: data.companyEmail },
      });
      resetForm();
    } catch (e) {
      const error = e as ILegalEntityValidationError;
      const { status, existError } = error;
      const errorKeys = existError.map(([key]: [string, boolean]) => key);
      switch (status) {
        case EErrorStatus.BAD_REQUEST:
          if (errorKeys.includes('isEmailAlreadyTaken')) {
            dispatch(setError(`${t('form.error.errorEmailRegistered')}`));
            setFormError(
              'companyEmail',
              {
                type: 'focus',
                message: t('form.error.errorEmailRegistered'),
              },
              { shouldFocus: true },
            );
          }
          if (errorKeys.includes('isNipAlreadyTaken')) {
            dispatch(setError(`${t('form.error.nipAlreadyRegistered')}`));
            setFormError(
              'nip',
              {
                type: 'focus',
                message: t('form.error.nipAlreadyRegistered'),
              },
              { shouldFocus: true },
            );
          }
          if (errorKeys.includes('isCompanyNameAlreadyTaken')) {
            dispatch(
              setError(`${t('form.error.companyNameAlreadyRegistered')}`),
            );
            setFormError(
              'companyName',
              {
                type: 'focus',
                message: t('form.error.companyNameAlreadyRegistered'),
              },
              { shouldFocus: true },
            );
          }
          break;
        default:
          dispatch(setError(t('LoginPage.serverError')));
          break;
      }
    }
  };

  const addShake = (error?: FieldError) => (error ? 'shake' : '');

  return (
    <>
      <StyledFormTitle>{t('form.title')}</StyledFormTitle>
      <StyledForm
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <Box>
          <StyledLabel htmlFor="companyName">
            {t('form.fields.companyName')}
          </StyledLabel>
          <InputField
            name="companyName"
            id="companyName"
            control={control}
            className={addShake(errors.companyName)}
            error={errors.companyName}
            placeholder="Company LLC"
          />
        </Box>
        <Box>
          <PatternFieldControlled
            name="nip"
            control={control}
            label={t('form.fields.nip')}
            error={errors.nip}
            format={NIP_PATTERN}
            placeholder="1234567890"
            textFieldProps={{
              sx: (theme) => ({
                animation: errors.nip ? `${theme.animations?.shake} 0.25s` : '',
              }),
            }}
          />
        </Box>
        <Box>
          <StyledLabel htmlFor="companyEmail">
            {t('form.fields.companyEmail')}
          </StyledLabel>
          <InputField
            name="companyEmail"
            id="companyEmail"
            control={control}
            className={addShake(errors.companyEmail)}
            error={errors.companyEmail}
            placeholder="example@company.com"
          />
        </Box>
        <Box>
          <StyledLabel htmlFor="ownerName">
            {t('form.fields.ownerName')}
          </StyledLabel>
          <InputField
            name="ownerName"
            id="ownerName"
            control={control}
            className={addShake(errors.ownerName)}
            error={errors.ownerName}
            placeholder="John Doe"
          />
        </Box>
        <SubmitButton
          buttonContent={t('form.submitLabel')}
          isDisabled={!isValid}
          sx={{ marginBottom: 3 }}
        />
      </StyledForm>
    </>
  );
};
