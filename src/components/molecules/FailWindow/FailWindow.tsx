import Box from '@mui/material/Box';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  SecondaryText,
  StyledBackButton,
  StyledButtonsRow,
  StyledHeader,
  StyledIcon,
} from './FailWindow.styled';

import { WarningIcon, CloseButton } from 'components/atoms';

interface FailWindowProps {
  onClose: () => void;
  sx?: SxProps<Theme>;
  title?: string;
  body?: string;
  depositFail?: boolean;
}

export const FailWindow = ({
  onClose,
  sx,
  title,
  body,
  depositFail,
}: FailWindowProps) => {
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
          <WarningIcon />
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
      <CloseButton onClick={onClose} sx={{ cursor: 'pointer' }} />
    </MainContainer>
  );
};
