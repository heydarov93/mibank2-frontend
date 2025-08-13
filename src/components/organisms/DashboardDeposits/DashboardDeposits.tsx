import { DashboardDepositEntry } from '../DashboardDepositEntry/DashboardDepositEntry';
import { EmptySection } from '../Sidebar/molecules';

import { StyledContainer } from './DashboardDeposits.styled';

import { IUserDeposit } from 'api/services/deposit-service/types/deposits.types';

interface IDepositEntry {
  id: number;
  accountId: string;
  depositId: number | null;
  amount: number;
  userData: IUserDeposit;
}

//for faking end date
const laterDate = (addDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + addDays);
  return date.toString();
};

const fakeData1: IUserDeposit = {
  depositId: 111,
  userDepositId: 1111,
  name: 'Corporate Deposit',
  amount: 9001,
  currency: 'USD',
  type: 'Savings',
  interestRate: 12,
  withdrawalFee: 2,
  withdrawalLimit: 1000,
  capitalizationRate: 12,
  status: 'active',
  timeLeft: 25,
  endDate: laterDate(200),
  startDate: new Date().toString(),
  accountNumber: 'somecorpor-ate-number',
};
const fakeData2: IUserDeposit = {
  depositId: 222,
  userDepositId: 2222,
  name: 'Education Deposit',
  amount: 1999.99,
  currency: 'PLN',
  type: 'Savings',
  interestRate: 12,
  withdrawalFee: 2,
  withdrawalLimit: 1000,
  capitalizationRate: 12,
  status: 'active',
  timeLeft: 50,
  endDate: laterDate(100),
  startDate: new Date().toString(),
  accountNumber: 'PL12 1116 6660 0000 0001 2345 678',
};
const fakeData3: IUserDeposit = {
  depositId: 333,
  userDepositId: 3333,
  name: 'Premium Savings Account',
  amount: 322.12,
  currency: 'EUR',
  type: 'Savings',
  interestRate: 12,
  withdrawalFee: 2,
  withdrawalLimit: 1000,
  capitalizationRate: 12,
  status: 'active',
  timeLeft: 90,
  endDate: laterDate(150),
  startDate: new Date().toString(),
  accountNumber: 'PL12 1116 6660 0000 0001 2345 678',
};

//TODO: This mockData should be replaced when actual API will be ready
const fakeUserDeposits: Array<IDepositEntry> = [
  {
    id: 1,
    accountId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    depositId: null,
    amount: 100,
    userData: fakeData1,
  },
  {
    id: 11,
    accountId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    depositId: null,
    amount: 0,
    userData: fakeData2,
  },
  {
    id: 12,
    accountId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    depositId: null,
    amount: 5,
    userData: fakeData3,
  },
];

export const DashboardDeposits = () => {
  const deposits: Array<IDepositEntry> = fakeUserDeposits;

  return (
    <StyledContainer>
      {deposits.length > 0 ? (
        deposits.map((e) => (
          <DashboardDepositEntry key={e.id} depositData={e.userData} />
        ))
      ) : (
        <EmptySection />
      )}
    </StyledContainer>
  );
};
