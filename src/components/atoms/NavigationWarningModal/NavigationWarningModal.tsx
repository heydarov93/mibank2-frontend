import CloseIcon from '@mui/icons-material/Close';
import { IconButton, SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

import { StyledNavigationWarningModal } from './NavigationWarningModal.styled';

interface NavigationWarningModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  testId?: string;
  sx?: SxProps<Theme>;
  onConfirm: () => void;
  onCancel: () => void;
}

export const NavigationWarningModal = ({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  testId,
  sx,
  onConfirm,
  onCancel,
}: NavigationWarningModalProps) => {
  const { t } = useTranslation('translation');

  return (
    <StyledNavigationWarningModal
      open={open}
      onClose={onCancel}
      data-testid={testId}
      sx={sx}
    >
      <DialogTitle>
        {title || t('RegistrationPage.navigationWarningModal.title')}
        <IconButton onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description ||
            t('RegistrationPage.navigationWarningModal.contentText')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} className="cancelButton">
          {cancelLabel || t('RegistrationPage.navigationWarningModal.cancel')}
        </Button>
        <Button onClick={onConfirm} className="confirmButton">
          {confirmLabel || t('RegistrationPage.navigationWarningModal.confirm')}
        </Button>
      </DialogActions>
    </StyledNavigationWarningModal>
  );
};
