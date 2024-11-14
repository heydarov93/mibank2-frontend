import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

import { StyledNavigationWarningModal } from './NavigationWarningModal.styled';

interface NavigationWarningModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const NavigationWarningModal = ({
  open,
  onConfirm,
  onCancel,
}: NavigationWarningModalProps) => {
  const { t } = useTranslation('translation');

  return (
    <StyledNavigationWarningModal open={open} onClose={onCancel}>
      <DialogTitle>
        {t('RegistrationPage.navigationWarningModal.title')}
        <IconButton onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('RegistrationPage.navigationWarningModal.contentText')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} className="cancelButton">
          {t('RegistrationPage.navigationWarningModal.cancel')}
        </Button>
        <Button onClick={onConfirm} className="confirmButton">
          {t('RegistrationPage.navigationWarningModal.confirm')}
        </Button>
      </DialogActions>
    </StyledNavigationWarningModal>
  );
};
