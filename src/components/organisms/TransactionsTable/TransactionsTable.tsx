import {
  Box,
  SelectChangeEvent,
  Table,
  TableBody,
  TableRow,
} from '@mui/material';
import { MouseEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  StyledHeaderCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableTitle,
} from './TransactionsTable.styled';
import { formatCardNumber, formatDateTime } from './utils/formatValueUtils';

import { CustomTableRow } from 'components/molecules';
import CustomTablePagination from 'components/molecules/CustomTablePagination/CustomTablePagination';
import { usePaginationInfo } from 'hooks';
import { Transaction, TransformedTransaction } from 'models/ITransactionInfo';

// TODO: this mockdata will replaced by real fetched data from API
const transactionsList: Transaction[] = [
  {
    id: '527f5dce-2983-4adb-b5f5-eff580c094b6',
    Type: 'Income',
    currency: 'PLN',
    amount: 112.4,
    fee: 20,
    total_amount: 132.4,
    datetime: '2025-03-28 15:21:11',
    status: 'successful',
    account_balance_after: 1000,
    third_party_IBAN: 'PL61109010140000071219812874',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 1234',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: '627f5dce-2983-4adb-b5f5-eff580c094b7',
    Type: 'Expense',
    currency: 'PLN',
    amount: 85.6,
    fee: 15,
    total_amount: 100.6,
    datetime: '2025-03-27 14:30:22',
    status: 'successful',
    account_balance_after: 867.6,
    third_party_IBAN: 'PL61109010140000071219812875',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 5678',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: '727f5dce-2983-4adb-b5f5-eff580c094b8',
    Type: 'Income',
    currency: 'PLN',
    amount: 250.0,
    fee: 12.5,
    total_amount: 262.5,
    datetime: '2025-03-26 09:15:33',
    status: 'successful',
    account_balance_after: 968.2,
    third_party_IBAN: 'PL61109010140000071219812876',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 9012',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: '827f5dce-2983-4adb-b5f5-eff580c094b9',
    Type: 'Expense',
    currency: 'PLN',
    amount: 175.3,
    fee: 8.75,
    total_amount: 184.05,
    datetime: '2025-03-25 16:45:44',
    status: 'successful',
    account_balance_after: 705.7,
    third_party_IBAN: 'PL61109010140000071219812877',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 3456',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: '927f5dce-2983-4adb-b5f5-eff580c094c0',
    Type: 'Income',
    currency: 'PLN',
    amount: 320.8,
    fee: 16.04,
    total_amount: 336.84,
    datetime: '2025-03-24 11:20:55',
    status: 'successful',
    account_balance_after: 889.75,
    third_party_IBAN: 'PL61109010140000071219812878',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 7890',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'a27f5dce-2983-4adb-b5f5-eff580c094c1',
    Type: 'Expense',
    currency: 'PLN',
    amount: 95.25,
    fee: 4.76,
    total_amount: 100.01,
    datetime: '2025-03-23 13:10:12',
    status: 'successful',
    account_balance_after: 552.91,
    third_party_IBAN: 'PL61109010140000071219812879',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 2468',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'b27f5dce-2983-4adb-b5f5-eff580c094c2',
    Type: 'Income',
    currency: 'PLN',
    amount: 450.0,
    fee: 22.5,
    total_amount: 472.5,
    datetime: '2025-03-22 08:30:21',
    status: 'successful',
    account_balance_after: 652.92,
    third_party_IBAN: 'PL61109010140000071219812880',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 1357',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'c27f5dce-2983-4adb-b5f5-eff580c094c3',
    Type: 'Expense',
    currency: 'PLN',
    amount: 67.89,
    fee: 3.39,
    total_amount: 71.28,
    datetime: '2025-03-21 19:55:33',
    status: 'successful',
    account_balance_after: 180.42,
    third_party_IBAN: 'PL61109010140000071219812881',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 9753',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'd27f5dce-2983-4adb-b5f5-eff580c094c4',
    Type: 'Income',
    currency: 'PLN',
    amount: 189.75,
    fee: 9.49,
    total_amount: 199.24,
    datetime: '2025-03-20 12:25:44',
    status: 'successful',
    account_balance_after: 251.7,
    third_party_IBAN: 'PL61109010140000071219812882',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 8642',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'e27f5dce-2983-4adb-b5f5-eff580c094c5',
    Type: 'Expense',
    currency: 'PLN',
    amount: 298.44,
    fee: 14.92,
    total_amount: 313.36,
    datetime: '2025-03-19 17:40:15',
    status: 'successful',
    account_balance_after: 52.46,
    third_party_IBAN: 'PL61109010140000071219812883',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 9630',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'f27f5dce-2983-4adb-b5f5-eff580c094c6',
    Type: 'Income',
    currency: 'PLN',
    amount: 525.0,
    fee: 26.25,
    total_amount: 551.25,
    datetime: '2025-03-18 10:15:26',
    status: 'successful',
    account_balance_after: 365.82,
    third_party_IBAN: 'PL61109010140000071219812884',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 7410',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'g27f5dce-2983-4adb-b5f5-eff580c094c7',
    Type: 'Expense',
    currency: 'PLN',
    amount: 142.15,
    fee: 7.11,
    total_amount: 149.26,
    datetime: '2025-03-17 14:50:37',
    status: 'successful',
    account_balance_after: -185.43,
    third_party_IBAN: 'PL61109010140000071219812885',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 8520',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'h27f5dce-2983-4adb-b5f5-eff580c094c8',
    Type: 'Income',
    currency: 'PLN',
    amount: 275.6,
    fee: 13.78,
    total_amount: 289.38,
    datetime: '2025-03-16 09:35:48',
    status: 'successful',
    account_balance_after: -36.17,
    third_party_IBAN: 'PL61109010140000071219812886',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 9640',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'i27f5dce-2983-4adb-b5f5-eff580c094c9',
    Type: 'Expense',
    currency: 'PLN',
    amount: 87.32,
    fee: 4.37,
    total_amount: 91.69,
    datetime: '2025-03-15 16:20:59',
    status: 'successful',
    account_balance_after: -325.55,
    third_party_IBAN: 'PL61109010140000071219812887',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 7530',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
  {
    id: 'j27f5dce-2983-4adb-b5f5-eff580c094d0',
    Type: 'Income',
    currency: 'PLN',
    amount: 412.8,
    fee: 20.64,
    total_amount: 433.44,
    datetime: '2025-03-14 11:45:10',
    status: 'successful',
    account_balance_after: -233.86,
    third_party_IBAN: 'PL61109010140000071219812888',
    user_card_name: 'Strong Card',
    user_card_number: '1234 1234 1234 8640',
    user_id: '3f3869ae-a693-4063-b2f8-1b0ad0dd2c68',
  },
];

export const TransactionsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { totalPages, pageDisplayText } = usePaginationInfo(
    transactionsList.length,
    page,
    rowsPerPage,
  );
  const { t } = useTranslation('translation', {
    keyPrefix: 'TransactionsHistoryPage',
  });

  // TODO: this paginatedData will replaced by real fetched data from API
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return transactionsList
      .slice(startIndex, endIndex)
      .map((transaction: Transaction) => {
        const { date, time } = formatDateTime(transaction.datetime);

        const transformedTransaction: TransformedTransaction = {
          id: transaction.id,
          card: formatCardNumber(
            transaction.user_card_name,
            transaction.user_card_number,
          ),
          amount: transaction.total_amount,
          isIncome: transaction.Type === 'Income',
          template: transaction.Type,
          date,
          time,
          status: transaction.status,
          currency: transaction.currency,
          fee: transaction.fee,
          accountBalance: transaction.account_balance_after,
          thirdPartyIBAN: transaction.third_party_IBAN,
        };

        return transformedTransaction;
      });
  }, [page, rowsPerPage, transactionsList]);

  const handlePageChange = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <StyledContainer>
      <StyledTableTitle variant="h3">{t('title')}</StyledTableTitle>
      <Box>
        <StyledTableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>{t('columnHeaders.card')}</StyledHeaderCell>
                <StyledHeaderCell>{t('columnHeaders.sum')}</StyledHeaderCell>
                <StyledHeaderCell>
                  {t('columnHeaders.template')}
                </StyledHeaderCell>
                <StyledHeaderCell>{t('columnHeaders.date')}</StyledHeaderCell>
                <StyledHeaderCell></StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {paginatedData.map((transaction: TransformedTransaction) => (
                <CustomTableRow
                  key={transaction.id}
                  cardNumber={transaction.card}
                  template={transaction.template}
                  isIncome={transaction.isIncome}
                  date={transaction.date}
                  time={transaction.time}
                  amount={transaction.amount}
                  currency={transaction.currency}
                />
              ))}
            </TableBody>
          </Table>

          <CustomTablePagination
            totalPages={totalPages}
            page={page}
            rowsPerPage={rowsPerPage}
            pageDisplayText={pageDisplayText}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </StyledTableContainer>
      </Box>
    </StyledContainer>
  );
};
