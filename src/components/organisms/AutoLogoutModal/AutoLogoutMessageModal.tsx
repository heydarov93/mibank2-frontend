import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

import { StyledAutoLogoutMessageModal } from './AutoLogoutMessageModal.styled';

import { useAppDispatch, useAppSelector } from 'hooks';
import { setIsAutoLogout } from 'store/reducers/AuthSlice';
import { getIsAutoLogout } from 'store/selectors';

export const AutoLogoutMessageModal = () => {
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
