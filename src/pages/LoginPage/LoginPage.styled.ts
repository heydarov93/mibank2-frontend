import { Box, Paper, Button, styled } from '@mui/material';

export const LoginPageWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const StyledPaper = styled(Paper)(({ theme: { spacing } }) => ({
  padding: spacing(2),
  height: '70vh',
  maxWidth: '280px',
  margin: spacing(3, 'auto'),
}));

export const StyledButton = styled(Button)(({ theme: { spacing } }) => ({
  margin: spacing(1, 0),
}));
