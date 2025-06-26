import {
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material';



export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    width: '100%',
    maxWidth: '1000px',
    height: 'fit-content',
    backgroundColor: palette.common.white,
    padding: spacing(4),
    borderRadius: '12px',
    boxShadow: `0 4px 24px 0 ${palette.shadow.shadowLight}`,
    border: `1px solid ${palette.border.lightBlue}`,
  }),
);

export const StyledTitleContainer = styled(Stack)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: spacing(2),
  marginBottom: spacing(1.5),
}));

export const StyledCardsContainer = styled(Stack)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: spacing(3),
}));

export const StyledEmptyContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.smallLogo?.fontFamily,
    fontSize: '26px',
    fontWeight: 600,
    lineHeight: '125%',
    width: 'max-content',
    color: palette.common.black,
  }),
);

export const StyledSubTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.smallLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    width: 'max-content',
    color: palette.grey[400],
  }),
);

export const StyledIconButton = styled(IconButton)(
  ({ theme: { spacing, palette } }) => ({
    width: '24px',
    height: '24px',
    padding: spacing(1),
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  }),
);

export const StyledAddButton = styled(Button)(
  ({ theme: { spacing, palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',

    height: '55px',
    minWidth: '140px',
    padding: spacing(1, 2),
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(1),
    marginTop: spacing(3),
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  }),
);

export const StyledNavigationButton = styled(Button)<{
  position: 'left' | 'right';
  disabled: boolean;
}>(({ position, disabled, theme: { palette } }) => {
  return {
    position: 'absolute',
    top: '40%',
    transform: 'translateY(-40%)',
    [position]: '-25px',
    borderRadius: '50%',
    minWidth: '25px',
    minHeight: '25px',
    height: '25px',
    width: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: palette.primary.main,
    zIndex: 10,

    '&:hover': {
      backgroundColor: 'transparent',
    },

    '& svg': {
      fontSize: '30px',
      color: disabled ? palette.grey[300] : palette.primary.main,
      transition: 'color 0.3s ease',
    },
  };
});

export const StyledPaginationContainer = styled(Box)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing(1),
    marginTop: spacing(4),
    padding: 0,
  }),
);

export const StyledPaginationIndicator = styled(Button)<{ active: boolean }>(
  ({ active, theme: { palette } }) => ({
    minWidth: '8px',
    minHeight: '8px',
    padding: 0,
    cursor: 'pointer',
    transition: 'all 0.3s ease',

    ...(active
      ? {
          backgroundColor: palette.primary.main,
          width: '16px',
          border: 'none',
        }
      : {
          backgroundColor: 'transparent',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          border: `1px solid ${palette.primary.main}`,
        }),

    '&:hover': {
      ...(active
        ? {
            backgroundColor: palette.primary.dark,
          }
        : {
            borderColor: palette.primary.dark,
          }),
    },
  }),
);

export const StyledCardsTrack = styled(Box)<{ translateX: number }>(
  ({ translateX, theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(8),
    transition: 'transform 0.3s ease',
    transform: `translateX(-${translateX}px)`,
    width: 'fit-content',
  }),
);
