import { Alert, AlertTitle, Snackbar } from '@mui/material';

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

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      sx={{ bgcolor: 'background.paper' }}
    >
      <Alert onClose={handleClose} severity="error" color="error">
        {message}
        {title && <AlertTitle>{title}</AlertTitle>}
      </Alert>
    </Snackbar>
  );
};
