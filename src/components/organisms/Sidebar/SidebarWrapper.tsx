import { useState } from 'react';

import { Sidebar } from './Sidebar';

import {
  AvailableDepositsWindow,
  IssueCardModal,
  OpenDepositModal
} from 'components/organisms';
import useDisclosure from 'hooks/useDisclosure';
import { IDeposit } from 'models/IDepositInfo';

export function SidebarWrapper() {
  const [deposit, setDeposit] = useState<IDeposit | null>(null);
  const issueCardModal = useDisclosure();
  const depositsModal = useDisclosure();

  function handleSetDeposit(deposit: IDeposit) {
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
        onSelectDeposit={handleSetDeposit}
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
