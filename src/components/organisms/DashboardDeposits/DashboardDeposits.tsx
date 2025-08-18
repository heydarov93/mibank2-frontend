import { DashboardDepositEntry } from '../DashboardDepositEntry/DashboardDepositEntry';
import { EmptySection } from '../Sidebar/molecules';
import { useUserDepositsRecent } from '../TransferView/hooks/user-deposits/useUserDepositsRecent';

import { StyledContainer } from './DashboardDeposits.styled';

import { IDepositBase } from 'api/services/deposit-service/types/user-deposits.types';

export const DashboardDeposits = () => {
  const { data: depositsData } = useUserDepositsRecent(false);

  const deposits: Array<IDepositBase> | undefined = depositsData;
  return (
    <StyledContainer>
      {deposits && deposits.length > 0 ? (
        deposits.map((e) => (
          <DashboardDepositEntry key={e.id} depositData={e} />
        ))
      ) : (
        <EmptySection />
      )}
    </StyledContainer>
  );
};
