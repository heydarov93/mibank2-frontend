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
import { IErrorData } from 'models/IError';
import { setError, setLegalEntityInfo } from 'store/reducers/AuthSlice';
import { businessSignupSchema, TBusinessSignupValues } from 'validation';

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
      nip: 'PL-NIP-',
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
      const response = await postValidationLegalEntityInfo(data).unwrap();
      const validity = Object.values(response).every(
        (taken) => taken === false,
      );
      if (!validity) {
        throw {
          originalStatus: EErrorStatus.BAD_REQUEST,
          name: response,
          body: response,
        };
      }
      dispatch(setLegalEntityInfo(data));
      navigate(TO_BUSINESS_CREATE_PASSWORD, {
        state: { email: data.companyEmail },
      });

      resetForm();
    } catch (e) {
      //!make more appropriate warning message
      const error = e as IErrorData;
      switch (error.status) {
        case EErrorStatus.BAD_REQUEST:
          setFormError(
            'companyEmail',
            {
              type: 'focus',
              message: t('SignupPage.email.errorEmailRegistered'),
            },
            { shouldFocus: true },
          );
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
            allowEmptyFormatting={true}
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
