import { Stack, StackProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './TransferSuccessfulActions.styled';

export interface TransferSuccessfulActionsProps extends StackProps {
  onNewTransfer?: () => void;
  onViewReceipt?: () => void;
}

export const TransferSuccessfulActions = ({
  sx,
  onNewTransfer,
  onViewReceipt,
  ...props
}: TransferSuccessfulActionsProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'TransfersPage.successModal',
  });

  return (
    <Stack
      direction="row"
      sx={{
        gap: '12px',
        justifyContent: 'flex-end',
        height: '48px',
        ...sx,
      }}
      {...props}
    >
      <StyledButton variant="outlined" onClick={onNewTransfer}>
        {t('newTransfer')}
      </StyledButton>
      <StyledButton variant="contained" onClick={onViewReceipt}>
        {t('viewReceipt')}
      </StyledButton>
    </Stack>
  );
};
