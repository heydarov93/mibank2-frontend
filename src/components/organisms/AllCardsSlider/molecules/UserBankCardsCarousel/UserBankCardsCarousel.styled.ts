import { Box, Button, styled } from '@mui/material';

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

export const StyledPaginationIndicator = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active, theme: { palette } }) => ({
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
}));

export const StyledCardsTrack = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'translateX',
})<{ translateX: number }>(({ translateX, theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing(8),
  transition: 'transform 0.3s ease',
  transform: `translateX(-${translateX}px)`,
  width: 'fit-content',
}));
