import { useState } from 'react';

import { DepositDetailsDrawer } from '../DepositDetailsDrawer/DepositDetailsDrawer';

import {
  AvailableDepositsWindow,
  IssueCardModal,
  OpenDepositModal,
  Sidebar,
} from 'components/organisms';
import { useDisclosure } from 'hooks';
import { IDisplayDeposit } from 'models/IDeposit';

export function SidebarWrapper() {
  const [deposit, setDeposit] = useState<IDisplayDeposit | null>(null);
  const [learnDeposit, setLearnDeposit] = useState<IDisplayDeposit | null>(null);
  const issueCardModal = useDisclosure();
  const depositsModal = useDisclosure();
  const depositLearnModal = useDisclosure();

  function handleSetDeposit(deposit: IDisplayDeposit) {
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

  function handleSetLearnDeposit(deposit: IDisplayDeposit) {
    setLearnDeposit(deposit);
    depositsModal.close();
    depositLearnModal.open();
  }

  function handleCloseLearnModal() {
    setLearnDeposit(null);
    depositLearnModal.close();
  }

  function handleBackLearnModal() {
    handleCloseLearnModal();
    depositsModal.open();
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
        onSetLearnDeposit={handleSetLearnDeposit}
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
      <DepositDetailsDrawer
        open={depositLearnModal.isOpen}
        data={learnDeposit}
        onClose={handleCloseLearnModal}
        onBack={handleBackLearnModal}
      />
    </>
  );
}
