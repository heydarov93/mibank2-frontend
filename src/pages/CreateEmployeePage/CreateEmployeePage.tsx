import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  StyledFormLabel,
  StyledTitle,
} from './CreateEmployeePage.styled';

import { useRegisterEmployeeMutation } from 'api/services/employee-service/employees.api';
import { InputField, SubmitButton } from 'components/atoms';
import { DocumentDatePicker } from 'components/molecules';
import { IErrorData } from 'models/IError';
import { theme } from 'theme/theme';
import { employeeRoles, employeeSchema, TEmployeeValues } from 'validation';
export const CreateEmployeePage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OTPVerificationPage',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TEmployeeValues>({
    resolver: yupResolver(employeeSchema),
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      dateAdded: '',
    },
  });

  const [registerEmployee, { isLoading }] = useRegisterEmployeeMutation();

  const onSubmit = async (data: TEmployeeValues) => {
    const formattedData = {
      ...data,
      role: data.role.toUpperCase(),
      dateAdded: dayjs(data.dateAdded).format('YYYY-MM-DD'),
    };

    try {
      const response = await registerEmployee(formattedData).unwrap();
      setResponseMessage(response.message);
      setErrorMessage('');
      reset(data);
    } catch (e: unknown) {
      let errorMsg = '';
      if (e instanceof Error) {
        errorMsg = e.message;
      } else if (
        typeof e === 'object' &&
        e !== null &&
        'data' in e &&
        (e as IErrorData).data.exceptionMessage
      ) {
        errorMsg = (e as IErrorData).data.exceptionMessage;
      } else {
        errorMsg = t('errors.errorCommon');
      }
      setErrorMessage(errorMsg);
      setResponseMessage('');
    }
  };

  return (
    <StyledContainer>
      <StyledTitle>Add new employee</StyledTitle>
      <form style={{ width: '420px' }} onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <StyledFormLabel>First Name</StyledFormLabel>
          <InputField
            name="firstName"
            control={control}
            id="firstName"
            placeholder="Enter the First Name"
            error={errors.firstName}
            helperText={errors.firstName?.message || ''}
          />
        </Box>

        <Box mb={3}>
          <StyledFormLabel>Last Name</StyledFormLabel>
          <InputField
            name="lastName"
            control={control}
            id="lastName"
            placeholder="Enter the Last Name"
            error={errors.lastName}
            helperText={errors.lastName?.message || ''}
          />
        </Box>

        <Box mb={3}>
          <StyledFormLabel>Email</StyledFormLabel>
          <InputField
            name="email"
            control={control}
            id="email"
            placeholder="example@gmail.com"
            error={errors.email}
            helperText={errors.email?.message || ''}
          />
        </Box>
        <Box mb={3}>
          <StyledFormLabel>Role</StyledFormLabel>
          <Autocomplete
            options={employeeRoles}
            getOptionLabel={(option) => option}
            onChange={(_, value) => setValue('role', value || '')}
            sx={{
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '&:hover:not(.Mui-focused)': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: `2px solid grey`,
                  },
                },
              },
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Choose here" />
            )}
          />
        </Box>

        <Box mb={3}>
          <StyledFormLabel>Date Added</StyledFormLabel>
          <DocumentDatePicker
            name="dateAdded"
            placeholder="Date Added"
            control={control}
            errors={errors}
            className={errors.dateAdded ? 'shake' : ''}
            id={'dateAdded'}
            maxDate={dayjs()}
          />
        </Box>
        {errorMessage && (
          <Typography
            sx={{ color: theme.palette.error.main, textAlign: 'center' }}
          >
            {errorMessage}
          </Typography>
        )}
        {responseMessage && <Alert>{responseMessage}</Alert>}
        <SubmitButton isDisabled={!isValid} buttonContent="Save" />
      </form>
      {isLoading && <CircularProgress sx={{ marginTop: '10px' }} />}
    </StyledContainer>
  );
};
