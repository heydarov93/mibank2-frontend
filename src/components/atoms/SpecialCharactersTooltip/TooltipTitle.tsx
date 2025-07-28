import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { SPECIAL_CHARACTERS } from 'constants/validation/patterns';

export const TooltipTitle = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.form.field.password.requirement',
  });

  return (
    <Typography
      component="span"
      variant="body2"
      sx={{ lineHeight: 1.6, whiteSpace: 'pre-line', width: 'max-content' }}
    >
      {`${t('allowedSpecialChars', { specialChars: SPECIAL_CHARACTERS })}`}
    </Typography>
  );
};
