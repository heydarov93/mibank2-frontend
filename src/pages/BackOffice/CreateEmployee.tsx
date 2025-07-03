import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useRegisterEmployeeMutation } from 'api/registerEmployee';
import { InputField, SubmitButton } from 'components/atoms';
import { DocumentDatePicker } from 'components/molecules';
import { IErrorData } from 'models/IError';
import { theme } from 'theme/theme';
import { employeeRoles, employeeSchema, TEmployeeValues } from 'validation';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateAdded: string;
};

export const CreateEmployee: React.FC = () => {
  const { t } = useTranslation('translation');

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

  const onSubmit = async (data: FormData) => {
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
        errorMsg = t('OTPVerificationPage.errors.errorCommon');
      }
      setErrorMessage(errorMsg);
      setResponseMessage('');
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={'100vh'}
      height={'auto'}
      padding={5}
    >
      <Typography fontSize={32} mb={3} fontWeight={'bold'}>
        Add new employee
      </Typography>
      <form style={{ width: '420px' }} onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Typography fontWeight={'bold'} fontSize={14}>
            First Name
          </Typography>
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
          <Typography fontWeight={'bold'} fontSize={14}>
            Last Name
          </Typography>
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
          <Typography fontWeight={'bold'} fontSize={14}>
            Email
          </Typography>
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
          <Typography fontWeight={'bold'} fontSize={14}>
            Role
          </Typography>
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
          <Typography fontWeight={'bold'} fontSize={14}>
            Date Added
          </Typography>
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
    </Box>
  );
};
