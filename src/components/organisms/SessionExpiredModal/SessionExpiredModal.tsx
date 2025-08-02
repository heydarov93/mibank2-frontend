import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';

import { StyledAutoLogoutMessageModal } from './SessionExpiredModal.styled';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getIsAutoLogout, setIsAutoLogout } from 'store/slices/auth';

export const SessionExpiredModal = () => {
  const { t } = useTranslation('translation');
  const isAutoLogout = useAppSelector(getIsAutoLogout);
  const dispatch = useAppDispatch();

  const handleLoginBtnClick = () => {
    dispatch(setIsAutoLogout(false));
  };

  return (
    <StyledAutoLogoutMessageModal
      open={isAutoLogout}
      onClose={handleLoginBtnClick}
    >
      <DialogTitle>
        <IconButton onClick={handleLoginBtnClick}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('AutoLogout.autoLogoutMessage')}
        </DialogContentText>
      </DialogContent>
    </StyledAutoLogoutMessageModal>
  );
};
