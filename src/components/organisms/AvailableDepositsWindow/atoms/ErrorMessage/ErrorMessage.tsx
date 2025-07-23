import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ErrorMessage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'GeneralErrors' });

  return (
    <Box
      sx={({ palette }) => ({
        color: palette.error.main,
        textAlign: 'center',
      })}
    >
      {t('errorCommon')}
    </Box>
  );
};
