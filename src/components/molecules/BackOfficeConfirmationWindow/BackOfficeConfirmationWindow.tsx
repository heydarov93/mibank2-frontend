import { Box, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  MainContainer,
  SecondaryText,
  StyledBackButton,
  StyledButtonsRow,
  StyledHeader
} from './BackOfficeConfirmationWindow.styled';

import CloseButtonX from 'components/atoms/CloseButtonX/CloseButtonX';
import SuccessfulCreationIcon from 'components/atoms/SuccessfulCreationIcon/SuccessfulCreationIcon';
import { LEARN_MORE_PAGE_BASE_URL } from 'constants/learnMorePage';

interface BackOfficeConfirmationWindowProps {
  onClose: () => void;
  sx?: SxProps<Theme>;
  title?: string;
  body?: string;
  depositId?: number;
  depositSuccess?: boolean;
}

const BackOfficeConfirmationWindow = ({
  onClose,
  sx,
  title,
  body,
  depositId,
  depositSuccess,
}: BackOfficeConfirmationWindowProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'LearnMorePage.confirmationModals',
  });
  const navigate = useNavigate();

  const onNavigate = () => {
    if (depositId) navigate(`${LEARN_MORE_PAGE_BASE_URL}${depositId}`);
  };

  return (
    <MainContainer sx={{ position: 'fixed', ...sx }}>
      <Box
        sx={({ spacing }) => ({
          display: 'flex',
          flexDirection: 'row',
          gap: spacing(1.75),
        })}
      >
        <Box
          sx={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SuccessfulCreationIcon sx={{ width: '48px', height: '48px' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <StyledHeader data-testid="confirmation-title">
              {title}
            </StyledHeader>
            <SecondaryText data-testid="secondary-text">{body}</SecondaryText>
          </Box>
          {depositSuccess && (
            <StyledButtonsRow>
              <StyledBackButton variant="outlined" onClick={onClose}>
                {t('backToHome')}
              </StyledBackButton>
              <StyledBackButton variant="contained" onClick={onNavigate}>
                {t('viewDeposit')}
              </StyledBackButton>
            </StyledButtonsRow>
          )}
        </Box>
      </Box>
        <CloseButtonX onClick={onClose} sx={{ cursor: 'pointer' }} />
    </MainContainer>
  );
};

export default BackOfficeConfirmationWindow;
