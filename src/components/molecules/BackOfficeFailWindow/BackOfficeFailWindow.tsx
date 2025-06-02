import { Box, SxProps, Theme, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  SecondaryText,
  StyledBackButton,
  StyledButtonsRow,
  StyledHeader,
  StyledIcon,
} from './BackOfficeFailWindow.styled';

import { BackOfficeWarningIcon } from 'components/atoms/BackOfficeWarningIcon/BackOfficeWarningIcon';
import CloseButtonX from 'components/atoms/CloseButtonX/CloseButtonX';

interface BackOfficeFailWindowProps {
  onClose: () => void;
  sx?: SxProps<Theme>;
  title?: string;
  body?: string;
  depositFail?: boolean;
}

const BackOfficeFailWindow = ({
  onClose,
  sx,
  title,
  body,
  depositFail,
}: BackOfficeFailWindowProps) => {
  const theme = useTheme();
  const { t } = useTranslation('translation', {
    keyPrefix: 'LearnMorePage.confirmationModals',
  });

  return (
    <MainContainer sx={{ position: 'fixed', ...sx }}>
      <Box
        sx={({ spacing }) => ({
          display: 'flex',
          flexDirection: 'row',
          gap: spacing(1.5),
        })}
      >
        <StyledIcon>
          <BackOfficeWarningIcon sx={{ color: theme.palette.error.main }} />
        </StyledIcon>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <StyledHeader data-testid="fail-title">{title}</StyledHeader>
            <SecondaryText data-testid="secondary-text">{body}</SecondaryText>
          </Box>
          {depositFail && (
            <StyledButtonsRow>
              <StyledBackButton variant="outlined">
                {t('goBack')}
              </StyledBackButton>
              <StyledBackButton
                variant="contained"
                sx={{ background: theme.palette.error.main }}
              >
                {t('cancel')}
              </StyledBackButton>
            </StyledButtonsRow>
          )}
        </Box>
      </Box>
      <CloseButtonX onClick={onClose} sx={{ cursor: 'pointer' }} />
    </MainContainer>
  );
};

export default BackOfficeFailWindow;
