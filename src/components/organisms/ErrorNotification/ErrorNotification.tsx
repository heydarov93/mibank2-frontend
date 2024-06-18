import { Alert, Snackbar } from '@mui/material';

import { useAppSelector, useAppDispatch } from 'hooks/hook';
import { clearError } from 'store/reducers/AuthSlice';
import { errorMessage } from 'store/selectors/AuthSelectors';

export const ErrorNotification = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorMessage);
  const open = Boolean(error);

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
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        <pre>{error}</pre>
      </Alert>
    </Snackbar>
  );
};
