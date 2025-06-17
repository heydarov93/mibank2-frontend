import { Box, Button, CircularProgress } from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
  StyledBackArrowIcon,
  StyledBackButton,
  StyledContainer,
} from './DepositLearnMorePage.styled';

import { Deposit, useGetDepositsQuery } from 'api/getDepositsApi';
import { DepositErrorMessage } from 'components/atoms';
import { DepositBox, InvestmentBox } from 'components/molecules';
import { depositBoxImages } from 'components/molecules/DepositBox/DepositBox';
import {
  AboutDepositCard,
  AvailableDepositsWindow,
  DepositBenefitsGrid,
  OpenDepositModal,
  OpenDepositRow,
} from 'components/organisms';
import useDisclosure from 'hooks/useDisclosure';

export const DepositLearnMorePage = () => {
  const params = useParams();
  const depositId = Number(params.id);
  const navigate = useNavigate();
  const { isOpen, close, open } = useDisclosure();
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });
  const {
    data: deposits,
    isLoading,
    isError: isDepositError,
  } = useGetDepositsQuery({});

  const depositIndex =
    deposits?.content?.findIndex((deposit) => deposit.id === depositId) ?? 0;
  const depositInfo = deposits?.content?.[depositIndex] ?? null;
  const isLoadingDeposits = isLoading || !depositInfo;
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const isViewingAllDepositsRef = useRef(false);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleDepositBack = () => {
    if (isViewingAllDepositsRef.current) {
      open();
    }

    setSelectedDeposit(null);
  };

  function handleOpenAllDeposits() {
    isViewingAllDepositsRef.current = true;
    open();
  }

  function handleOpenDepositForm() {
    isViewingAllDepositsRef.current = false;
    setSelectedDeposit(depositInfo);
  }

  if (isDepositError) {
    return <DepositErrorMessage />;
  }

  if (isLoadingDeposits) {
    return <CircularProgress />;
  }

  const viewAllDespositsButton = (
    <Button
      onClick={handleOpenAllDeposits}
      variant="outlined"
      sx={(theme) => ({ padding: theme.spacing(1, 2) })}
      data-testid="open-all-deposits-button"
    >
      {t('viewAllDeposits')}
    </Button>
  );

  return (
    <>
      <Box position="relative">
        <StyledBackButton
          data-testid="back-button"
          onClick={handleNavigateBack}
          variant="text"
          startIcon={<StyledBackArrowIcon />}
        >
          {t('back')}
        </StyledBackButton>
      </Box>
      <StyledContainer>
        <Box>
          <DepositBox
            depositCurrency={depositInfo.currency}
            depositDescription={depositInfo.description}
            depositDuration={depositInfo.term}
            depositName={depositInfo.name}
            depositRate={depositInfo.interestRate}
            depositImgSrc={
              depositBoxImages[depositIndex % depositBoxImages.length]
            }
            secondaryButton={viewAllDespositsButton}
            onOpenDepositForm={handleOpenDepositForm}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <AboutDepositCard
            capitalizationRate={depositInfo.capitalization}
            depositName={depositInfo.name}
            interestRate={depositInfo.interestRate}
            months={depositInfo.term}
            wdFee={depositInfo.earlyWithdrawalFee}
            wdLimit={depositInfo.earlyWithdrawalLimit}
            minDeposit={depositInfo.min}
          />
          <InvestmentBox
            interestRate={depositInfo.interestRate}
            setOpenDeposit={() => setSelectedDeposit(depositInfo)}
          />
        </Box>
        <DepositBenefitsGrid />
        <OpenDepositRow
          onBack={handleDepositBack}
          depositName={depositInfo.name}
          depositId={depositId}
          depositCurrency={depositInfo.currency}
          interestRate={depositInfo.interestRate}
          term={depositInfo.term}
        />
      </StyledContainer>
      <AvailableDepositsWindow
        open={isOpen}
        onClose={close}
        onSetDeposit={(deposit) => {
          setSelectedDeposit(deposit);
          close();
        }}
      />
      <OpenDepositModal
        deposit={selectedDeposit}
        onClose={() => setSelectedDeposit(null)}
        onBack={handleDepositBack}
      />
    </>
  );
};
