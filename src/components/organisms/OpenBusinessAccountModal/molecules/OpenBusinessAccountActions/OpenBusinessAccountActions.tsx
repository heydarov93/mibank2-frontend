import { SxProps, Theme } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledActionsWrapper, StyledModalButton } from './OpenBusinessAccountActions.styled';

import { OpenBusinessAccFormValues } from 'hooks/useOpenBusinessAccFlow';

interface OpenBusinessAccountActionsProps {
  onCancel: () => void;
  sx?: SxProps<Theme>;
}


export const OpenBusinessAccountActions = ({
  sx,
  onCancel,
}: OpenBusinessAccountActionsProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OpenBusinessAccountModal',
  });
  const {
    formState: { isValid },
  } = useFormContext<OpenBusinessAccFormValues>();

  return (
    <StyledActionsWrapper sx={sx}>
      <StyledModalButton variant="outlined" onClick={onCancel}>
        {t('cancel')}
      </StyledModalButton>
      <StyledModalButton
        variant="contained"
        disabled={!isValid}
        type="submit"
        sx={{ width: '150px' }}
        data-testid="open-acc-button"
      >
        {t('openAcc')}
      </StyledModalButton>
    </StyledActionsWrapper>
  );
};
