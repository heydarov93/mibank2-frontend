import { Box, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  MainContainer,
  SecondaryText,
  StyledBackButton,
  StyledButtonsRow,
  StyledHeader,
} from './BackOfficeConfirmationWindow.styled';

import { CloseButton, SuccessfulCreationIcon } from 'components/atoms';
import { TO_DEPOSIT_LEARN_MORE_BASE } from 'constants/navigation/routePaths';

interface BackOfficeConfirmationWindowProps {
  onClose: () => void;
  sx?: SxProps<Theme>;
  title?: string;
  body?: string;
  depositId?: number;
  depositSuccess?: boolean;
}

export const BackOfficeConfirmationWindow = ({
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
    if (depositId) navigate(`${TO_DEPOSIT_LEARN_MORE_BASE}${depositId}`);
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
      <CloseButton onClick={onClose} sx={{ cursor: 'pointer' }} />
    </MainContainer>
  );
};

