import { Box, Select, styled, Typography } from '@mui/material';

export const StyledMainContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    border: `1px solid ${palette.grey[100]}`,
    padding: spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
);

export const StyledSecondaryText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontSize: typography.mediumLogo?.fontSize,
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.grey[400],
    fontWeight: '500',
  }),
);

export const StyledSelect = styled(Select<number>)(
  ({ theme: { palette } }) => ({
    width: '70px',
    height: '40px',
    backgroundColor: palette.primary.light,
    borderRadius: '4px',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.primary.dark,
    },
  }),
);

export const StyledItemsCountContainer = styled(Box)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing(2.25),
  }),
);
