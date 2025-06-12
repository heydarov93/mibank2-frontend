import { Button, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledActionsWrapper } from 'components/atoms';
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
    <StyledActionsWrapper sx={sx}>
      <Button variant="outlined" onClick={onCancel}>
        {t('cancel')}
      </Button>
      <Button
        variant="contained"
        disabled={step !== ECardIssueStepper.CARD_SELECTED}
        onClick={onConfirm}
        data-testid="issue-card-modal-continue-button"
      >
        {t('continue')}
      </Button>
    </StyledActionsWrapper>
  );
};
