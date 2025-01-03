import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

import { StyledAutoLogoutModal } from './AutoLogoutModal.styled';

interface AutoLogoutModalProps {
  open: boolean;
  logout?: () => void;
  getBack?: () => void;
}

export const AutoLogoutModal = ({
  open,
  logout,
  getBack,
}: AutoLogoutModalProps) => {
  const { t } = useTranslation('translation');

  return (
    <StyledAutoLogoutModal open={open} onClose={logout}>
      <DialogTitle>
        {t('AutoLogout.autoLogoutTitle')}
        <IconButton onClick={getBack}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('AutoLogout.autoLogoutDescription')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={logout} className="cancelButton">
          {t('AutoLogout.logoutBtn')}
        </Button>
        <Button onClick={getBack} className="confirmButton">
          {t('AutoLogout.getBackBtn')}
        </Button>
      </DialogActions>
    </StyledAutoLogoutModal>
  );
};
