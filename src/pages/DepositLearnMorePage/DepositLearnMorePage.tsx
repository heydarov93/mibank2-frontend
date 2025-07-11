import { Button, CircularProgress } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { StyledContainer } from './DepositLearnMorePage.styled';

import { useGetDepositsQuery } from 'api/services/deposit-service/deposits.api';
import { DepositErrorMessage } from 'components/atoms';
import { depositBoxImages } from 'components/molecules/DepositBox/DepositBox';
import {
  AvailableDepositsWindow,
  DepositLearnMoreContent,
  DepositLearnMoreHeader,
  OpenDepositModal,
} from 'components/organisms';
import useDisclosure from 'hooks/useDisclosure';
import { IDeposit } from 'models/IDepositInfo';

export const DepositLearnMorePage = () => {
  const { id } = useParams<{ id: string }>();
  const isViewingAllDepositsRef = useRef(false);
  const depositId = Number(id);
  const navigate = useNavigate();
  const { isOpen, close, open } = useDisclosure();
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
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

  const handleNavigateBack = () => navigate(-1);

  const handleDepositBack = () => {
    if (isViewingAllDepositsRef.current) {
      open();
    }
    setSelectedDeposit(null);
  };

  const handleOpenAll = () => {
    isViewingAllDepositsRef.current = true;
    open();
  };

  function handleOpenForm() {
    isViewingAllDepositsRef.current = false;
    setSelectedDeposit(deposit);
  }

  const handleSelectDeposit = (deposit: IDeposit) => {
    setSelectedDeposit(deposit);
    close();
  };

  if (isDepositError) {
    return (
      <StyledContainer>
        <DepositErrorMessage />
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

  const viewAllButton = (
    <Button
      onClick={handleOpenAll}
      variant="outlined"
      data-testid="open-all-deposits-button"
      sx={({ spacing }) => ({ padding: spacing(1, 2) })}
    >
      {t('viewAllDeposits')}
    </Button>
  );

  const idx = depositsData.indexOf(deposit as IDeposit);
  const imageSrc = depositBoxImages[idx % depositBoxImages.length];

  return (
    <>
      <DepositLearnMoreHeader onBack={handleNavigateBack} label={t('back')} />

      <DepositLearnMoreContent
        deposit={deposit}
        imageSrc={imageSrc}
        viewAllButton={viewAllButton}
        onOpenForm={handleOpenForm}
        onBack={handleDepositBack}
        onOpenDeposit={setSelectedDeposit}
      />
      <AvailableDepositsWindow
        open={isOpen}
        onClose={close}
        onSelectDeposit={handleSelectDeposit}
      />
      <OpenDepositModal
        deposit={selectedDeposit}
        onClose={() => setSelectedDeposit(null)}
        onBack={handleDepositBack}
      />
    </>
  );
};
