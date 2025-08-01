import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import {
  MainHeader,
  ProductName,
  SecondaryHeader,
  StyledBox,
} from './WarningWindow.styled';

import { WarningIcon } from 'components/atoms';
import { ITableData } from 'models/ITable';
import { theme } from 'theme/theme';

interface WarningWindowProps {
  open?: boolean;
  product?: Partial<ITableData>;
  employee?: Partial<ITableData>;
  deposit?: boolean;
  sx?: SxProps<Theme>;
  onDeleteClick?: (product: Partial<ITableData> | undefined) => void;
  onCancelClick?: () => void;
  onBackClick?: () => void;
  title?: string;
  text?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export const WarningWindow = ({
  open,
  product,
  employee,
  deposit,
  sx,
  onDeleteClick,
  onCancelClick,
  onBackClick,
  title,
  text,
  isLoading,
  isError,
  errorMessage,
}: WarningWindowProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(product);
    }
  };

  return (
    <Dialog
      open={open as boolean}
      onClose={onCancelClick}
      BackdropProps={{
        sx: {
          backgroundColor: theme.palette.shadow.shadowMedium,
        },
      }}
      PaperProps={{
        sx: {
          width: 535,
          height: 220,
          padding: 4,
          border: `1px solid ${theme.palette.error.main}`,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          ...sx,
        },
      }}
    >
      <DialogTitle sx={{ padding: 0, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <StyledBox>
            <WarningIcon />
          </StyledBox>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MainHeader>{title}</MainHeader>
            <SecondaryHeader>
              {text}
              {product?.productSubtype && (
                <ProductName>“{product.productSubtype}”?</ProductName>
              )}
              {employee?.firstName && employee?.lastName && (
                <ProductName>
                  “{employee.firstName} {employee.lastName}”?
                </ProductName>
              )}
            </SecondaryHeader>
          </Box>
        </Box>
      </DialogTitle>

      {product || employee ? (
        <DialogActions sx={{ padding: 0, justifyContent: 'flex-end', gap: 1 }}>
          {isLoading && <CircularProgress size={24} />}
          <Button variant="outlined" onClick={onCancelClick}>
            {t('ConfirmationWindow.cancelBtn')}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteClick}
            disabled={isLoading}
          >
            {t('ConfirmationWindow.deleteBtn')}
          </Button>
        </DialogActions>
      ) : null}

      {deposit && (
        <DialogActions sx={{ padding: 0, justifyContent: 'flex-end', gap: 1 }}>
          {isLoading && <CircularProgress size={24} />}
          <Button variant="outlined" onClick={onBackClick}>
            Go Back
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            onClick={onCancelClick}
          >
            Cancel
          </Button>
        </DialogActions>
      )}

      {isError && (
        <DialogContent sx={{ justifyContent: 'center', padding: 0 }}>
          <Typography
            sx={{ color: theme.palette.error.main, textAlign: 'center' }}
          >
            {errorMessage}
          </Typography>
        </DialogContent>
      )}
    </Dialog>
  );
};
