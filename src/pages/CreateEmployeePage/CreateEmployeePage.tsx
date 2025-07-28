import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
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
import { DATE_FORMATS } from 'constants/business/date';
import { IErrorData } from 'models/IError';
import { employeeRoles, employeeSchema, TEmployeeValues } from 'validation';

export const CreateEmployeePage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OTPVerificationPage',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [registerEmployee, { isLoading }] = useRegisterEmployeeMutation();

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

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    }
    if (
      typeof error === 'object' &&
      error !== null &&
      'data' in error &&
      (error as IErrorData).data?.exceptionMessage
    ) {
      return (error as IErrorData).data.exceptionMessage;
    }
    return t('errors.errorCommon');
  };
  const onSubmit = useCallback(
    async (data: TEmployeeValues) => {
      const formattedData = {
        ...data,
        role: data.role.toUpperCase(),
        dateAdded: dayjs(data.dateAdded).format(DATE_FORMATS.YYYY_MM_DD),
      };

      try {
        const response = await registerEmployee(formattedData).unwrap();
        setResponseMessage(response.message);
        setErrorMessage('');
        reset(data);
      } catch (error) {
        const errorMsg = handleError(error);
        setErrorMessage(errorMsg);
        setResponseMessage('');
      }
    },
    [registerEmployee, handleError, reset],
  );

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
            sx={({ palette }) => ({
              color: palette.error.main,
              textAlign: 'center',
            })}
            data-testid="error-message"
          >
            {errorMessage}
          </Typography>
        )}
        {responseMessage && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
            data-testid="success-message"
          >
            {responseMessage}
          </Alert>
        )}
        <SubmitButton
          isDisabled={!isValid || isLoading}
          buttonContent={isLoading ? 'Saving...' : 'Save'}
        />
      </form>

      {isLoading && <CircularProgress sx={{ marginTop: '10px' }} />}
    </StyledContainer>
  );
};
