import { Alert, AlertTitle, Snackbar, useTheme } from '@mui/material';

import { useAppSelector, useAppDispatch } from 'hooks/hook';
import { clearError } from 'store/reducers/AuthSlice';
import { errorMessage } from 'store/selectors/AuthSelectors';

export const ErrorNotification = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorMessage);
  const open = Boolean(error);

  const errorParts = error ? error.split('.') : [];
  const title = errorParts.length > 1 ? errorParts[0] : '';
  const message = errorParts.length > 1 ? errorParts.slice(1).join('.') : error;

  const theme = useTheme();

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{
          width: '100%',
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.main,
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};
