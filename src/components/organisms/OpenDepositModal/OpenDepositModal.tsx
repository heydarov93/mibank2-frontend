import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Deposit } from 'api/getDepositsApi';
import { DepositCreationForm } from 'components/molecules/DepositCreationForm/DepositCreationForm';
import DepositInfoCard from 'components/molecules/DepositInfoCard/DepositInfoCard';
import { StyledCloseButton } from 'components/molecules/DepositInfoCard/DepositInfoCard.styled';
import { DRAWER_HEIGHT_CALC_SIZE } from 'constants/learnMorePage';

interface OpenDepositModalProps {
  deposit: Deposit | null;
  onClose?: () => void;
  onBack: () => void;
}

export const OpenDepositModal = ({
  onClose,
  onBack,
  deposit,
}: OpenDepositModalProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const accounts = [t('account1'), t('account2')];

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
          accounts={accounts}
          modal={true}
          onCloseModal={onClose}
          onBack={onBack}
        />
        {deposit && <DepositInfoCard {...deposit} />}
        <StyledCloseButton onClick={onClose}>
          <CloseIcon />
        </StyledCloseButton>
      </Box>
    </Drawer>
  );
};
