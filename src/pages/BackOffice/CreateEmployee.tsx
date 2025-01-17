import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import { InputField, SubmitButton } from 'components/atoms';
import { employeeRoles, employeeValidationSchema } from 'validation/validationCreateEmployee';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateAdded: string;
};

const CreateEmployee: React.FC = () => {
  const {
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(employeeValidationSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      dateAdded: '',
    },
  });

  return (
    <Box
      width="75%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={'100vh'}
      height={'auto'}
      padding={5}
    >
      <Typography variant="h6">Add new employee</Typography>
      <form style={{ width: '45%' }}>
        <Box mb={2}>
          <Typography fontWeight={'bold'}>First Name</Typography>
          <InputField
            name="firstName"
            control={control}
            id="firstName"
            placeholder="Enter the First Name"
            error={errors.firstName}
            helperText={errors.firstName?.message || ''}
          />
        </Box>

        <Box mb={2}>
          <Typography fontWeight={'bold'}>Last Name</Typography>
          <InputField
            name="lastName"
            control={control}
            id="lastName"
            placeholder="Enter the Last Name"
            error={errors.lastName}
            helperText={errors.lastName?.message || ''}
          />
        </Box>

        <Box mb={2}>
          <Typography fontWeight={'bold'}>Email</Typography>
          <InputField
            name="email"
            control={control}
            id="email"
            placeholder="example@gmail.com"
            error={errors.email}
            helperText={errors.email?.message || ''}
          />
        </Box>
        <Box mb={2}>
          <Typography fontWeight={'bold'}>Role</Typography>
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

        <Box mb={2}>
          <Typography fontWeight={'bold'}>Date Added</Typography>
          <InputField
            type="date"
            placeholder="Date Added"
            error={errors.dateAdded}
            helperText={errors.dateAdded?.message || ''}
            name="dateAdded"
            control={control}
            id="dateAdded"
          />
        </Box>

        <SubmitButton isDisabled={!isValid} buttonContent="Save" />
      </form>
    </Box>
  );
};

export default CreateEmployee;
