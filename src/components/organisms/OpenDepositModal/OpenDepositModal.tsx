import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Drawer, useTheme } from '@mui/material';

import { DepositCreationForm, DepositInfoCard } from 'components/molecules';
import { StyledCloseButton } from 'components/molecules/DepositInfoCard/DepositInfoCard.styled';
import { IDeposit } from 'models/IDepositInfo';

interface OpenDepositModalProps {
  deposit: IDeposit | null;
  onClose: () => void;
  onBack: () => void;
}

export const OpenDepositModal = ({
  onClose,
  onBack,
  deposit,
}: OpenDepositModalProps) => {
  const { spacing } = useTheme();

  return (
    <Drawer
      anchor="right"
      open={!!deposit}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: `calc(100vh - ${spacing(7.5)})`,
          maxHeight: 'min-content',
          top: '60px',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        },
      }}
    >
      <Box display="flex">
        {deposit && (
          <DepositCreationForm
            modal={true}
            onBack={onBack}
            depositName={deposit.name}
            depositId={deposit.id}
            currency={deposit.currency}
            interestRate={deposit.interestRate}
            term={deposit.term}
          />
        )}
        {deposit && <DepositInfoCard {...deposit} />}
        <StyledCloseButton onClick={onBack} data-testid="modal-close-button">
          <CloseRoundedIcon />
        </StyledCloseButton>
      </Box>
    </Drawer>
  );
};
