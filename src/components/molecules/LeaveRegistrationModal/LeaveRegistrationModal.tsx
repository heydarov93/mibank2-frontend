import { Box, Dialog, DialogContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  StyledBody,
  StyledButton,
  StyledButtonRow,
  StyledTitle,
} from './LeaveRegistrationModal.styled';

import { CloseButton } from 'components/atoms';
import { TO_WELCOME } from 'constants/navigation/routePaths';

interface LeaveRegistrationModalProps {
  open: boolean;
  onCloseModal: () => void;
}

export const LeaveRegistrationModal = ({
  open,
  onCloseModal,
}: LeaveRegistrationModalProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'SignupPage' });

  return (
    <Dialog
      open={open}
      onClose={onCloseModal}
      PaperProps={{
        sx: {
          padding: '55px',
          borderRadius: '10px',
          position: 'relative',
        },
      }}
    >
      <Box>
        <StyledTitle variant="h3">{t('leaveRegisterModal.title')}</StyledTitle>
        <CloseButton
          onClick={onCloseModal}
          sx={{ position: 'absolute', top: '25px', right: '15px' }}
        />
      </Box>

      <DialogContent sx={{ paddingBottom: '32px' }}>
        <StyledBody variant="body2">{t('leaveRegisterModal.body')}</StyledBody>
      </DialogContent>

      <StyledButtonRow>
        <StyledButton variant="outlined" onClick={onCloseModal} fullWidth>
          {t('leaveRegisterModal.cancelBtn')}
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={() => navigate(TO_WELCOME)}
          fullWidth
        >
          {t('leaveRegisterModal.confirmBtn')}
        </StyledButton>
      </StyledButtonRow>
    </Dialog>
  );
};
