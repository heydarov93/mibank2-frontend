import { CircularProgress } from '@mui/material';

import { StyledLoadingBox } from './LoadingSpinner.styled';

export const LoadingSpinner = () => (
  <StyledLoadingBox>
    <CircularProgress />
  </StyledLoadingBox>
);
