import { Box, SxProps, Theme, useTheme } from '@mui/material';

import {
  MainContainer,
  SecondaryText,
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
}

const BackOfficeFailWindow = ({
  onClose,
  sx,
  title,
  body,
}: BackOfficeFailWindowProps) => {
  const theme = useTheme();

  return (
    <MainContainer sx={{ position: 'fixed', ...sx }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '12px',
        }}
      >
        <StyledIcon>
          <BackOfficeWarningIcon sx={{ color: theme.palette.error.main }} />
        </StyledIcon>
        <Box>
          <StyledHeader data-testid="fail-title">{title}</StyledHeader>
          <SecondaryText data-testid="secondary-text">{body}</SecondaryText>
        </Box>
      </Box>
      <CloseButtonX onClick={onClose} />
    </MainContainer>
  );
};

export default BackOfficeFailWindow;
