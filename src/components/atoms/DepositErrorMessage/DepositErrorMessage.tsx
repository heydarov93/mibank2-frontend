import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const DepositErrorMessage = () => {
  const { t } = useTranslation('translation');

  return (
    <Box
      sx={(theme) => ({
        color: theme.palette.error.main,
        textAlign: 'center',
      })}
    >
      {t('GeneralErrors.errorCommon')}
    </Box>
  );
};
