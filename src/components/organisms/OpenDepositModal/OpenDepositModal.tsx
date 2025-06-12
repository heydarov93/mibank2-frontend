import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Drawer } from '@mui/material';

import { Deposit } from 'api/getDepositsApi';
import { DepositCreationForm, DepositInfoCard } from 'components/molecules';
import { StyledCloseButton } from 'components/molecules/DepositInfoCard/DepositInfoCard.styled';
import { DRAWER_HEIGHT_CALC_SIZE } from 'constants/learnMorePage';

interface OpenDepositModalProps {
  deposit: Deposit | null;
  onClose: () => void;
  onBack: () => void;
}

export const OpenDepositModal = ({
  onClose,
  onBack,
  deposit,
}: OpenDepositModalProps) => {

  return (
    <Drawer
      anchor="right"
      open={!!deposit}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: `calc(100vh - ${DRAWER_HEIGHT_CALC_SIZE}px)`,
          maxHeight: 'min-content',
          top: '60px',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        },
      }}
    >
      <Box display="flex">
        <DepositCreationForm
          modal={true}
          onBack={onBack}
          depositName={deposit?.name as string}
          depositId={deposit?.id as number}
          currency={deposit?.currency as string}
          interestRate={deposit?.interestRate as number}
          term={deposit?.term as number}
        />
        {deposit && <DepositInfoCard {...deposit} />}
        <StyledCloseButton
          onClick={onBack}
          data-testid="modal-close-button"
        >
          <CloseRoundedIcon />
        </StyledCloseButton>
      </Box>
    </Drawer>
  );
};
