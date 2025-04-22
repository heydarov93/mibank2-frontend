import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { MainHeader } from '../BackOfficeCardEditForm/BackOfficeCardEditForm.styled';

import { InputField, SubmitButton } from 'components/atoms';
import CloseButtonX from 'components/atoms/CloseButtonX/CloseButtonX';
import { DocumentDatePicker } from 'components/molecules';
import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';
import {
  employeeRoles,
  employeeValidationSchema,
} from 'validation/validationCreateEmployee';

type EmployeeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateAdded: string;
};

interface BackOfficeEditEmployeeProps {
  open?: boolean;
  sx?: SxProps<Theme>;
  handleClose: () => void;
  formData?: Partial<TableData>;
  handleUpdate?: (employee: Partial<TableData>) => Promise<void>;
}

const BackOfficeEditEmployee = ({
  open,
  sx,
  handleClose,
  formData,
  handleUpdate,
}: BackOfficeEditEmployeeProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'BackOffice.employeeList',
  });
  const theme = useTheme();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeValidationSchema),
    mode: 'all',
    defaultValues: {
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      role: formData?.role,
      dateAdded:
        formData?.dateAdded &&
        new Date(formData?.dateAdded || '').toLocaleDateString('en-GB'),
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    const formattedData = {
      ...data,
      id: formData?.id,
      dateAdded: dayjs(data.dateAdded).format('YYYY-MM-DD'),
    };
    handleUpdate?.(formattedData);
    handleClose();
  };

  return (
    <Dialog
      open={open as boolean}
      onClose={handleClose}
      BackdropProps={{
        sx: {
          backgroundColor: theme.palette.shadow.shadowMedium,
        },
      }}
      PaperProps={{
        sx: {
          width: 535,
          height: 600,
          padding: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          ...sx,
        },
      }}
    >
      <DialogTitle sx={{ padding: 0, mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <MainHeader>{t('editEmployee')}</MainHeader>
          <CloseButtonX onClick={handleClose} />
        </Box>
      </DialogTitle>
      <DialogActions>
        <form style={{ width: '420px' }} onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('firstName')}
            </Typography>
            <InputField
              name="firstName"
              control={control}
              id="firstName"
              placeholder={t('placeholder.firstName')}
              error={errors.firstName}
              helperText={errors.firstName?.message || ''}
            />
          </Box>

          <Box mb={3}>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('lastName')}
            </Typography>
            <InputField
              name="lastName"
              control={control}
              id="lastName"
              placeholder={t('placeholder.lastName')}
              error={errors.lastName}
              helperText={errors.lastName?.message || ''}
            />
          </Box>

          <Box mb={3}>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('email')}
            </Typography>
            <InputField
              name="email"
              control={control}
              id="email"
              placeholder={t('placeholder.email')}
              error={errors.email}
              helperText={errors.email?.message || ''}
            />
          </Box>
          <Box mb={3}>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('role')}
            </Typography>
            <Autocomplete
              options={employeeRoles}
              defaultValue={formData?.role}
              getOptionLabel={(option) => option}
              onChange={(_, value) => setValue('role', value || '')}
              sx={{
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  '&:hover:not(.Mui-focused)': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: `2px solid ${theme.palette.grey[200]}`,
                    },
                  },
                },
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder={t('placeholder.role')} />
              )}
            />
          </Box>

          <Box mb={3}>
            <Typography fontWeight={'bold'} fontSize={14}>
              {t('dateAdded')}
            </Typography>
            <DocumentDatePicker
              name="dateAdded"
              placeholder={t('dateAdded')}
              control={control}
              errors={errors}
              className={errors.dateAdded ? 'shake' : ''}
              id={'dateAdded'}
              maxDate={dayjs()}
            />
          </Box>
          <SubmitButton
            isDisabled={!isValid}
            buttonContent={t('save')}
          />
        </form>
      </DialogActions>
    </Dialog>
  );
};

export default BackOfficeEditEmployee;
