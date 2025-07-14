import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledForm,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
} from './BackOfficeEmployeeLoginForm.styled';

import { useValidateEmployeeEmailMutation } from 'api/services/employee-service/employees.api';
import { InputField, SubmitButton } from 'components/atoms';
import {
  BACK_OFFICE_EMPLOYEE_VERIFY_CODE,
  TO_BACK_OFFICE,
} from 'constants/navigation/routePaths';
import { employeeLoginSchema, TEmployeeLoginValues } from 'validation';

export const BackOfficeEmployeeLoginForm = () => {
  const [validateEmployeeEmail, { isLoading }] =
    useValidateEmployeeEmailMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation('translation', {
    keyPrefix: 'EmployeeLoginPage',
  });

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    resetField,
  } = useForm<TEmployeeLoginValues>({
    resolver: yupResolver(employeeLoginSchema),
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
    try {
      setErrorMessage('');
      const res = await validateEmployeeEmail({
        email: control._formValues.email,
      }).unwrap();
      if (res?.message) {
        navigate(BACK_OFFICE_EMPLOYEE_VERIFY_CODE, {
          replace: true,
          state: { email: control._formValues.email, from: TO_BACK_OFFICE },
        });
      } else {
        setErrorMessage(t('invalidEmailMessage'));
      }
    } catch (error) {
      setErrorMessage(t('invalidEmailMessage'));
    }
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
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Box>
        </StyledFormContent>

        <SubmitButton
          onClick={handleCleanField}
          buttonContent={t('submitButton')}
          isDisabled={!isValid || isLoading}
          sx={{ marginTop: 2 }}
        />
      </StyledForm>
    </>
  );
};
