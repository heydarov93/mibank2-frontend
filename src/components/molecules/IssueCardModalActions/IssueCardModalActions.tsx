import { Stack, Button, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ECardIssueStepper } from 'enums/ECardIssueStepper';

interface IssueCardModalActionsProps {
  step: ECardIssueStepper;
  onCancel: () => void;
  onConfirm: () => void;
  sx?: SxProps<Theme>;
}

export const IssueCardModalActions = ({
  step,
  sx,
  onCancel,
  onConfirm,
}: IssueCardModalActionsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });

  return (
    <Stack
      direction="row"
      sx={{
        gap: 3,
        justifyContent: 'flex-end',
        height: '56px',
        ...sx,
      }}
    >
      <Button variant="outlined" sx={{ width: '113px' }} onClick={onCancel}>
        {t('cancel')}
      </Button>
      <Button
        variant="contained"
        disabled={step !== ECardIssueStepper.CARD_SELECTED}
        onClick={onConfirm}
        data-testid="issue-card-modal-continue-button"
        sx={{ width: '113px' }}
      >
        {t('continue')}
      </Button>
    </Stack>
  );
};
