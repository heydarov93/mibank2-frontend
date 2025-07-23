import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledBackArrow } from './BackArrow.styled';

export const BackArrow = memo<{ onBackClick?: () => void }>(
  ({ onBackClick }: { onBackClick?: () => void }) => {
    const { t } = useTranslation('translation');

    return (
      <StyledBackArrow
        onClick={onBackClick}
        role="button"
        aria-label={t('Accessibility.label.backArrow')}
        data-testid="back-arrow"
      >
        <KeyboardArrowLeftIcon aria-hidden="true" focusable="false" />
        {t('RegistrationPage.buttonBackArrow')}
      </StyledBackArrow>
    );
  },
);

BackArrow.displayName = 'BackArrow';
