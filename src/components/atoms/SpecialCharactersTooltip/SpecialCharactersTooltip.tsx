import { Tooltip, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { specialCharacters } from 'constants/specialCharacters';

export function SpecialCharactersTooltip({
  children,
}: {
  children: ReactElement;
}) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.form.field.password.requirement',
  });
  return (
    <Tooltip
      slotProps={{
        tooltip: {
          sx: (theme) => ({
            maxWidth: 'max-content',
            backgroundColor: theme.palette.grey[400],
            padding: theme.spacing(1, 2),
          }),
        },
      }}
      title={
        <Typography
          lineHeight={1.6}
          whiteSpace="break-spaces"
          fontSize={14}
          width="max-content"
        >
          {`${t('allowedSpecialChars')}:\n ${specialCharacters}`}
        </Typography>
      }
      placement="top"
    >
      {children}
    </Tooltip>
  );
}
