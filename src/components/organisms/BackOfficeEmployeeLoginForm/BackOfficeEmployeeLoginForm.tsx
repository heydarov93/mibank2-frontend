import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
} from './BackOfficeEmployeeLoginForm.styled';

import { InputField, SubmitButton } from 'components/atoms';
import { IBackOfficeEmployeeLogin } from 'models/IAuth';
import { validationBackOfficeEmployeeLoginSchema } from 'validation';

export const BackOfficeEmployeeLoginForm = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'EmployeeLoginPage',
  });

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    resetField,
  } = useForm<IBackOfficeEmployeeLogin>({
    resolver: yupResolver(validationBackOfficeEmployeeLoginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const handleCleanField = () => {
    if (errors.email) resetField('email');
  };

  const navigate = useNavigate();

  const onSubmit = async () => {
    navigate('/back-office/verify');
  };

  return (
    <>
      <StyledFormTitle>{t('formTitle')}</StyledFormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContent>
          <Box sx={{ width: '100%' }}>
            <StyledLabel htmlFor="email">{t('email')}</StyledLabel>
            <InputField
              name="email"
              id="email"
              control={control}
              className={errors.email ? 'shake' : ''}
              error={errors.email}
              placeholder="example@gmail.com"
            />
          </Box>
        </StyledFormContent>

        <SubmitButton
          onClick={handleCleanField}
          buttonContent={t('submitButton')}
          isDisabled={!isValid}
        />
      </StyledForm>
    </>
  );
};
