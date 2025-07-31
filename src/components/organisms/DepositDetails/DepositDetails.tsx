import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemo, useRef, useState } from 'react';

import { StyledContainer } from './DepositDetails.styled';

import { useGetDepositsQuery } from 'api/services/deposit-service/deposits.api';
import { depositBoxImages } from 'components/molecules/DepositBox/DepositBox';
import { DepositDetailsContent, OpenDepositModal } from 'components/organisms';
import { ErrorMessage } from 'components/organisms/AvailableDepositsWindow/atoms/ErrorMessage/ErrorMessage';
import useDisclosure from 'hooks/useDisclosure';
import { IDeposit } from 'models/IDepositInfo';

interface DepositDetailsProps {
  depositData: IDeposit;
  onBack: () => void;
}

export const DepositDetails = ({
  depositData,
  onBack,
}: DepositDetailsProps) => {
  const isViewingAllDepositsRef = useRef(false);
  const depositId = depositData.id;
  const { open } = useDisclosure();
  const {
    data: deposits,
    isLoading,
    isError: isDepositError,
  } = useGetDepositsQuery({});

  const depositsData = deposits?.content || [];

  const deposit = useMemo(() => {
    return depositsData.find((deposit) => deposit.id === depositId) || null;
  }, [deposits, depositId]);

  const isLoadingDeposits = isLoading || !deposit;
  const [selectedDeposit, setSelectedDeposit] = useState<IDeposit | null>(null);

  const handleDepositBack = () => {
    if (isViewingAllDepositsRef.current) {
      open();
    }
    setSelectedDeposit(null);
  };

  function handleOpenForm() {
    isViewingAllDepositsRef.current = false;
    setSelectedDeposit(deposit);
  }

  if (isDepositError) {
    return (
      <StyledContainer>
        <ErrorMessage />
      </StyledContainer>
    );
  }

  if (isLoadingDeposits) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  const idx = depositsData.indexOf(deposit as IDeposit);
  const imageSrc = depositBoxImages[idx % depositBoxImages.length];

  return (
    <Box>
      <DepositDetailsContent
        deposit={deposit}
        imageSrc={imageSrc}
        onOpenForm={handleOpenForm}
        onBack={onBack}
      />
      <OpenDepositModal
        deposit={selectedDeposit}
        onClose={() => setSelectedDeposit(null)}
        onBack={handleDepositBack}
      />
    </Box>
  );
};
