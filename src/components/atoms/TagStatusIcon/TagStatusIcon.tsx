import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const TagStatusIcon = memo<{ isValidated: boolean }>(
  ({ isValidated }: { isValidated: boolean }) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return isValidated ? (
      <CheckIcon
        sx={{ width: '14px', height: '14px' }}
        data-testid="success-icon"
        role="img"
        aria-label={t('label.check')}
      />
    ) : (
      <ClearIcon
        sx={{ width: '14px', height: '14px' }}
        data-testid="error-icon"
        role="img"
        aria-label={t('label.clear')}
      />
    );
  },
);

TagStatusIcon.displayName = 'TagStatusIcon';
