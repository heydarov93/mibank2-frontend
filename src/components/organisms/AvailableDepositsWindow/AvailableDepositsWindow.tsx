import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MainContainer, StyledHeader } from './AvailableDepositsWindow.styled';

import CloseButtonX from 'components/atoms/CloseButtonX/CloseButtonX';
import { DepositBox } from 'components/molecules';

interface AvailableDepositsWindowProps {
  onClose: () => void;
  isOpen: boolean;
}

export const AvailableDepositsWindow = ({
  onClose,
  isOpen,
}: AvailableDepositsWindowProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'DepositWindow' });
  const [openDeposit, setOpenDeposit] = useState<boolean>(false);
  if (!isOpen) {
    return null;
  }

  const mockData = [
    {
      name: 'The Best Deposit',
      id: 1,
      type: 'Term Deposit',
      currency: 'USD',
      min: 1,
      max: 2,
      description: 'Valid Description Valid',
      term: 12,
      interestRate: 1,
      capitalization: 3,
      earlyWithdrawalLimit: 2,
      earlyWithdrawalFee: 3,
      earlyWithdrawal: true,
      augmentable: true,
      autoRenewable: true,
    },
  ];

  return (
    <MainContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <StyledHeader>{t('availableDeposits')}</StyledHeader>
        <CloseButtonX onClick={onClose} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {mockData.map((item) => (
          <DepositBox
            key={item.id}
            depositCurrency={item.currency}
            depositDescription={item.description}
            depositDuration={item.term}
            depositName={item.name}
            depositRate={item.interestRate}
            redirect={`/deposits/learn-more/${item.id}`}
            openDeposit={openDeposit}
            setOpenDeposit={setOpenDeposit}
          />
        ))}
      </Box>
    </MainContainer>
  );
};
