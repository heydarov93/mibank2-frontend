import { useState } from 'react';

import { Sidebar } from './Sidebar';

import { Deposit } from 'api/getDepositsApi';
import {
  AvailableDepositsWindow,
  IssueCardModal,
  OpenDepositModal
} from 'components/organisms';
import useDisclosure from 'hooks/useDisclosure';

export function SidebarWrapper() {
  const [deposit, setDeposit] = useState<Deposit | null>(null);
  const issueCardModal = useDisclosure();
  const depositsModal = useDisclosure();

  function handleSetDeposit(deposit: Deposit) {
    setDeposit(deposit);
    depositsModal.close();
  }

  function handleBack() {
    handleCloseDepositModal();
    depositsModal.open();
  }

  function handleCloseDepositModal() {
    setDeposit(null);
  }

  return (
    <>
      <Sidebar
        onIssueCardModalOpen={issueCardModal.open}
        onDepositsModalOpen={depositsModal.open}
      />
      <AvailableDepositsWindow
        open={depositsModal.isOpen}
        onClose={depositsModal.close}
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
    </>
  );
}
