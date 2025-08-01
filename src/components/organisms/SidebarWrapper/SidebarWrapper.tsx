import { useState } from 'react';

import { DepositDetailsDrawer } from '../DepositDetailsDrawer/DepositDetailsDrawer';

import {
  AvailableDepositsWindow,
  IssueCardModal,
  OpenDepositModal,
  Sidebar,
} from 'components/organisms';
import { useDisclosure } from 'hooks';
import { IDeposit } from 'models/IDepositInfo';

export function SidebarWrapper() {
  const [deposit, setDeposit] = useState<IDeposit | null>(null);
  const [learnDeposit, setLearnDeposit] = useState<IDeposit | null>(null);
  const issueCardModal = useDisclosure();
  const depositsModal = useDisclosure();
  const depositLearnModal = useDisclosure();

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

  function handleSetLearnDeposit(deposit: IDeposit) {
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
