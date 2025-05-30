import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';

import { Deposit } from 'api/getDepositsApi';
import {
  AvailableDepositsWindow,
  OffersCarousel,
  IssueCardModal,
  OpenBusinessAccountModal,
} from 'components/organisms';
import CurrencyCalculator from 'components/organisms/CurrencyCalculator/CurrencyCalculator';
import { RatesTable } from 'components/organisms/CurrencyExchange/Rates/RatesTable';
import { Title } from 'components/organisms/CurrencyExchange/Title/Title';
import { OpenDepositModal } from 'components/organisms/OpenDepositModal/OpenDepositModal';
import useDisclosure from 'hooks/useDisclosure';

const Homepage = () => {
  const [deposit, setDeposit] = useState<Deposit | null>(null);
  const availableDepositsModal = useDisclosure();
  const issueCardModal = useDisclosure();
  const openBusinessAccountModal = useDisclosure();

  function handleSetDeposit(deposit: Deposit) {
    setDeposit(deposit);
    availableDepositsModal.close();
  }

  function handleCloseDepositModal() {
    setDeposit(null);
  }

  function handleBack() {
    handleCloseDepositModal();
    availableDepositsModal.open();
  }

  return (
    <Box display={'flex'} width={'100%'}>
      <Stack padding={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <span>My Cards</span>
          <Button
            variant="contained"
            onClick={issueCardModal.open}
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
            onClick={availableDepositsModal.open}
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
          <span>Open business account</span>
          <Button
            variant="contained"
            onClick={openBusinessAccountModal.open}
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
          open={availableDepositsModal.isOpen}
          onClose={availableDepositsModal.close}
          onSetDeposit={handleSetDeposit}
        />
        <OpenDepositModal
          deposit={deposit}
          onClose={handleCloseDepositModal}
          onBack={handleBack}
        />
        <IssueCardModal
          open={issueCardModal.isOpen}
          onClose={issueCardModal.close}
        />
        <OpenBusinessAccountModal
          open={openBusinessAccountModal.isOpen}
          onClose={openBusinessAccountModal.close}
        />
      </Box>
    </Box>
  );
};

export default Homepage;
