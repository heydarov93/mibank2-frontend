import { Drawer, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DepositCreationForm } from 'components/molecules/DepositCreationForm/DepositCreationForm';
import DepositInfoCard from 'components/molecules/DepositInfoCard/DepositInfoCard';

interface BackOfficeWarningWindowProps {
  open?: boolean;
  sx?: SxProps<Theme>;
  onCancelClick: () => void;
  title?: string;
  text?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const OpenDepositModal = ({
  onCancelClick,
  open,
  sx,
}: BackOfficeWarningWindowProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const accounts = [t('account1'), t('account2')];

  const mockData = {
    id: 1,
    title: 'The Best Deposit',
    description:
      'is the perfect choice for growing your new funds with attractive returns',
    minDeposit: 100,
    months: 12,
    interestRate: 3,
    capitalizationRate: 4,
  };

  return (
    <Drawer
      anchor="right"
      open={open as boolean}
      onClose={onCancelClick}
      PaperProps={{
        sx: {
          maxWidth: '1000px',
          height: '666px',
          display: 'flex',
          flexDirection: 'row',
          ...sx,
        },
      }}
    >
      <DepositCreationForm
        accounts={accounts}
        modal={true}
        onCloseModal={onCancelClick}
      />
      <DepositInfoCard {...mockData} onCloseModal={onCancelClick} />
    </Drawer>
  );
};

export default OpenDepositModal;
