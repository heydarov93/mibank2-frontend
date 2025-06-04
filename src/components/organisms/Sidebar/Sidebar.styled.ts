import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)(({ theme: { spacing } }) => ({
  padding: spacing(1.75, 3),
}));
