import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';

import { Deposit } from 'api/getDepositsApi';
import {
  AvailableDepositsWindow,
  OffersCarousel,
  IssueCardModal,
} from 'components/organisms';
import CurrencyCalculator from 'components/organisms/CurrencyCalculator/CurrencyCalculator';
import { RatesTable } from 'components/organisms/CurrencyExchange/Rates/RatesTable';
import { Title } from 'components/organisms/CurrencyExchange/Title/Title';
import { OpenDepositModal } from 'components/organisms/OpenDepositModal/OpenDepositModal';
import useDisclosure from 'hooks/useDisclosure';

const Homepage = () => {
  const [deposit, setDeposit] = useState<Deposit | null>(null);
  const {
    isOpen: isAvailableDepositsModalOpen,
    open: openAvailableDepositsModal,
    close: closeAvailableDepositsModal,
  } = useDisclosure();
  const {
    isOpen: isIssueCardModalOpen,
    open: openIssueCardModal,
    close: closeIssueCardModal,
  } = useDisclosure();

  function handleSetDeposit(deposit: Deposit) {
    setDeposit(deposit);
    closeAvailableDepositsModal();
  }

  function handleCloseDepositModal() {
    setDeposit(null);
  }

  function handleBack() {
    handleCloseDepositModal();
    openAvailableDepositsModal();
  }

  return (
    <Box display={'flex'} width={'100%'}>
      <Stack padding={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <span>My Cards</span>
          <Button
            variant="contained"
            onClick={openIssueCardModal}
            sx={{
              borderRadius: '50%',
              minWidth: 0,
              padding: 0.5,
            }}
          >
            <AddIcon />
          </Button>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <span>My deposits</span>
          <Button
            variant="contained"
            onClick={openAvailableDepositsModal}
            sx={{
              borderRadius: '50%',
              minWidth: 0,
              padding: 0.5,
            }}
          >
            <AddIcon />
          </Button>
        </Box>
      </Stack>
      <Box width={'80%'}>
        <Box mt={5}>
          <OffersCarousel />
        </Box>
        <Box marginTop={5} paddingBottom={3} width={'90%'}>
          <Title />
          <Box display={'flex'} width={'100%'} marginTop={3}>
            <Box width={'50%'}>
              <CurrencyCalculator />
            </Box>
            <RatesTable />
          </Box>
        </Box>
        <AvailableDepositsWindow
          open={isAvailableDepositsModalOpen}
          onClose={closeAvailableDepositsModal}
          onSetDeposit={handleSetDeposit}
        />
        <OpenDepositModal
          deposit={deposit}
          onClose={handleCloseDepositModal}
          onBack={handleBack}
        />
        <IssueCardModal
          open={isIssueCardModalOpen}
          onClose={closeIssueCardModal}
        />
      </Box>
    </Box>
  );
};

export default Homepage;
