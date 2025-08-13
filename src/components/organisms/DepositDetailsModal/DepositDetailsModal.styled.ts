import { Box, Chip, styled, Typography } from '@mui/material';

export const StyledBlueBox = styled(Box)(({ theme }) => ({
  height: '40%',
  width: '100%',
  padding: theme.spacing(5.87, 5, 5.87, 5),
}));

export const DetailsHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3.875),
}));

export const HeaderBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const FirstColumnHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2.5),
}));

export const StyledButton = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3, 2, 2.5),
  marginTop: theme.spacing(3),
  width: 107,
  borderRadius: theme.spacing(1),
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  display: 'block',
  marginLeft: 'auto',
  textAlign: 'center',
  cursor: 'pointer',
}));

export const StyledTitle = styled(Typography)(({ theme: { palette } }) => ({
  fontFamily: 'Urbanist',
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: '26px',
  color: palette.common.black,
}));

export const StyledSecondRowText = styled(Typography)(
  ({ theme: { palette } }) => ({
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    color: palette.grey[400],
  }),
);

export const StyledStatusChip = styled(Chip)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.custom.success.chipBg,
    padding: spacing(0.75, 3),
    '& .MuiChip-label': {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: spacing(1.5),
      lineHeight: spacing(2),
      letterSpacing: 0,
      color: palette.custom.success.chipText,
      padding: 0,
    },
  }),
);
