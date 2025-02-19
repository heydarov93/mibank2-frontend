import {
  Box,
  Button,
  FormControlLabel,
  styled,
  Typography,
} from '@mui/material';

export const PopoverTrigger = styled(Button)(({ theme: { palette } }) => ({
  borderRadius: '4px',
  padding: '8px 12px',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  boxShadow: `0px 1px 10px 0px ${palette.primary.main}33`,
}));

export const FilterTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontSize: '16px',
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    color: palette.grey[400],
  }),
);

export const StyledFormControlLabel = styled(FormControlLabel)(
  ({ theme: { palette } }) => ({
    border: `1px solid ${palette.grey[100]}`,
    width: '100%',
    margin: '0',
    padding: '4px 10px 4px 0',
  }),
);

export const StyledLabel = styled(Typography)(({ theme: { typography } }) => ({
  fontSize: typography.mediumLogo?.fontSize,
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: '500',
}));

export const StyledHeaderBox = styled(Box)(({ theme: { palette } }) => ({
  border: `1px solid ${palette.grey[100]}`,
  width: '100%',
  margin: '0',
  padding: '8px 12px',
}));
