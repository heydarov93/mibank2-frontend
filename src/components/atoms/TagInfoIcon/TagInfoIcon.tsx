import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { SpecialCharactersTooltip } from '../SpecialCharactersTooltip/SpecialCharactersTooltip';

export const TagInfoIcon = memo(() => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Accessibility',
  });

  return (
    <SpecialCharactersTooltip>
      <InfoOutlinedIcon
        sx={{ width: '14px', height: '14px' }}
        data-testid="info-icon"
        role="img"
        aria-label={t('label.info')}
      />
    </SpecialCharactersTooltip>
  );
});

TagInfoIcon.displayName = 'TagInfoIcon';
