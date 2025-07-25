import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import { DownloadIcon, ShareIcon } from 'components/atoms';

export const PaymentReceiptActions = (props: StackProps) => {
  const { t } = useTranslation('translation');

  // TODO : Add functionality to download and share buttons when the requirements are ready
  return (
    <Stack direction="row" gap={2} justifyContent="space-between" {...props}>
      <Button
        variant="text"
        startIcon={<DownloadIcon />}
        sx={(theme) => ({
          color: theme.palette.primary.dark,
          fontWeight: 400,
          paddingInline: theme.spacing(2),
        })}
      >
        {t('TransfersPage.paymentReceiptModal.download')}
      </Button>
      <Button
        variant="text"
        startIcon={<ShareIcon />}
        sx={(theme) => ({
          color: theme.palette.primary.dark,
          fontWeight: 400,
          paddingInline: theme.spacing(2),
        })}
      >
        {t('TransfersPage.paymentReceiptModal.share')}
      </Button>
    </Stack>
  );
};
