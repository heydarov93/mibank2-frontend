import { Box, Button, ButtonProps, styled } from '@mui/material';
import { LinkProps } from 'react-router-dom';

export const StyledIconContainer = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '56px',
  height: '56px',
  color: palette.primary.main,
  borderRadius: '50%',
  boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
}));

export const StyledContainer = styled(Button)<ButtonProps & LinkProps>(
  ({ theme: { palette, spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: spacing(1),
    padding: spacing(2),
    border: `1px solid ${palette.border.lightBlue}`,
    borderRadius: '8px',
    boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
  }),
);
