import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

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
