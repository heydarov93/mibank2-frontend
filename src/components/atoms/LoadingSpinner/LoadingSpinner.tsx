import CircularProgress from '@mui/material/CircularProgress';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledLoadingBox } from './LoadingSpinner.styled';

export const LoadingSpinner = memo(() => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Accessibility',
  });

  return (
    <StyledLoadingBox
      role="status"
      aria-live="polite"
      aria-label={t('label.loading')}
    >
      <CircularProgress aria-busy={true} />
    </StyledLoadingBox>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
