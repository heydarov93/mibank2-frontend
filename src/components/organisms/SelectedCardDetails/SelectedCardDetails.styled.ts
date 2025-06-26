import {
  Box,
  Button,
  IconButton,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    width: '100%',
    height: 'fit-content',
    backgroundColor: palette.common.white,
    borderRadius: '12px',
    padding: spacing(5),
    boxShadow: `0 4px 24px 0 ${palette.shadow.shadowLight}`,
    border: `1px solid ${palette.border.lightBlue}`,
  }),
);

export const StyledHeader = styled(Box)(({ theme: { spacing } }) => ({
  marginBottom: spacing(5),
}));

export const StyledTitle = styled(Typography)(
  ({ theme: { spacing, typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '26px',
    color: palette.common.black,
    marginBottom: spacing(4),
    lineHeight: '125%',
    fontWeight: 600,
  }),
);

export const StyledButtonGroup = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: spacing(3),
  gap: spacing(3),
}));

export const ButtonLayout = styled(Button)(({ theme: { spacing } }) => ({
  height: '48px',
  fontWeight: 500,
  fontSize: '14px',
  padding: spacing(1, 3),
  borderRadius: '8px',
  cursor: 'pointer',
}));

export const StyledPrimaryButton = styled(ButtonLayout)(
  ({ theme: { palette } }) => ({
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  }),
);

export const StyledOutlinedButton = styled(ButtonLayout)(
  ({ theme: { palette } }) => ({
    color: palette.primary.main,
    borderColor: palette.primary.main,
    '&:hover': {
      borderColor: palette.primary.dark,
    },
  }),
);

export const StyledTabs = styled(Tabs)(({ theme: { spacing, palette } }) => ({
  marginBottom: spacing(4),

  '.MuiTabs-indicator': {
    backgroundColor: palette.primary.main,
    height: '2px',
  },

  '.MuiTabs-flexContainer': {
    borderBottom: `1px solid ${palette.grey[400]}`,
  },
}));

export const StyledTab = styled(Tab)(({ theme: { spacing, palette } }) => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '100%',
  color: palette.grey[500],
  padding: spacing(1, 3),
  width: '100%',
  minWidth: '300px',
  maxWidth: '300px',

  '&.Mui-selected': {
    color: palette.primary.main,
    fontWeight: 500,
  },

  '&:hover': {
    color: palette.primary.main,
  },
}));

export const StyledInfoSection = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: spacing(3),
}));

export const StyledInfoRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 0,
  gap: spacing(7),
}));

export const StyledInfoLabel = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: '400',
    justifyContent: 'space-between',
    color: palette.grey[400],
    textTransform: 'uppercase',
    minWidth: '132px',
  }),
);

export const StyledInfoValue = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1,
  gap: spacing(1.25),
}));

export const StyledInfoText = styled(Typography)<{ status?: string }>(
  ({ theme: { typography, palette }, status }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '100%',
    color:
      status === 'active'
        ? palette.success.main
        : status === 'blocked' || status === 'expired'
          ? palette.error.main
          : palette.common.black,
  }),
);

export const StyledMaskedText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '2px',
    color: palette.common.black,
  }),
);

export const StyledActionIcon = styled(IconButton)(
  ({ theme: { palette } }) => ({
    width: '22px',
    height: '22px',
    padding: '5px',
    color: palette.grey[400],

    '&:hover': {
      backgroundColor: palette.bg.lightBlue,
      color: palette.primary.main,
    },

    '.MuiSvgIcon-root': {
      fontSize: '22px',
    },
  }),
);
