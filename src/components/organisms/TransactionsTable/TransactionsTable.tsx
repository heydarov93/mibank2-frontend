import UnfoldMore from '@mui/icons-material/UnfoldMore';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { MouseEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PaymentReceiptModal } from '../PaymentReceiptModal/PaymentReceiptModal';

import {
  StyledContainer,
  StyledEmptyStateContainer,
  StyledEmptyStateContent,
  StyledEmptyTableCell,
  StyledHeaderCell,
  StyledSortIconButton,
  StyledTableContainer,
  StyledTableHead,
  StyledTableTitle,
} from './TransactionsTable.styled';
import { useTransactions } from './hooks/useTransactions';
import { useTransferFilters } from './hooks/useTransferFilters';
import { TransferFilters } from './molecules';

import { CustomTablePagination, CustomTableRow } from 'components/molecules';
import { DEFAULT_PAGE_SIZE } from 'constants/business/pagination';
import { SORT_ORDER } from 'constants/business/sortOrder';
import { usePaginationInfo } from 'hooks';
import { IPaymentReceipt } from 'models/IPaymentReceipt';
import { Transaction, TransformedTransaction } from 'models/ITransactionInfo';
import {
  formatCardNumber,
  formatTransactionDate,
  formatIbanNumber,
} from 'utils/formatters';
import { TTransactionFiltersValues } from 'validation';

const FakePaymentReceiptData: IPaymentReceipt = {
  payerName: 'Yashar Aliyev',
  date: '2025-03-28T15:21:11Z',
  fromAccount: 'PL61109010140000071219812874',
  toAccount: 'PL61109010140000071219812875',
  amount: '112.40',
  currency: 'PLN',
  fee: 20,
  totalAmount: 132.4,
  transferMethod: 'card',
};

export const TransactionsTable = () => {
  const [page, setPage] = useState(0);
  const [showPaymentReceipt, setShowPaymentReceipt] = useState(false);
  const [paymentReceiptData, setPaymentReceiptData] = useState<IPaymentReceipt>(
    FakePaymentReceiptData,
  );
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const { availableFilters, defaultFilters } = useTransferFilters();
  const [currentFilters, setCurrentFilters] =
    useState<TTransactionFiltersValues>(defaultFilters);
  const {
    transactionsList,
    transactionsLength,
    emptyTransactionsTableText,
    setDataSortOrder,
  } = useTransactions({
    page,
    count: rowsPerPage,
    currentFilters,
  });

  const { totalPages, pageDisplayText } = usePaginationInfo(
    transactionsLength,
    page,
    rowsPerPage,
  );

  const { t } = useTranslation('translation', {
    keyPrefix: 'TransactionsHistoryPage',
  });

  const paginatedData = useMemo(() => {
    return transactionsList.map((transaction: Transaction) => {
      const { date, time } = formatTransactionDate(transaction.dateTime);

      const transformedTransaction: TransformedTransaction = {
        id: transaction.id,
        sourceNumber:
          transaction.transferType === 'CARD'
            ? formatCardNumber(transaction.source)
            : formatIbanNumber(transaction.source),
        amount: transaction.totalAmount,
        transferType: transaction.transferType === 'CARD' ? 'Card' : 'Account',
        isIncome: transaction.type === 'INCOME',
        template: 'Salary', // Placeholder for template, will be replaced with actual data
        date,
        time,
        currency: transaction.currencyCode,
      };

      return transformedTransaction;
    });
  }, [transactionsList]);

  const handleSortByDate = () => {
    setPage(0);
    setDataSortOrder((prev) =>
      prev === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC,
    );
  };

  const handlePageChange = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleFiltersChange = (currentFilters: TTransactionFiltersValues) => {
    setCurrentFilters((prev) => ({ ...prev, ...currentFilters }));
    setPage(0);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleShowPaymentReceipt = (paymentInfo: IPaymentReceipt) => {
    setShowPaymentReceipt(true);
    setPaymentReceiptData(paymentInfo);
  };

  return (
    <StyledContainer>
      <StyledTableTitle variant="h3">{t('title')}</StyledTableTitle>
      <TransferFilters
        sx={{ mb: 1 }}
        availableFilters={availableFilters}
        defaultFilters={defaultFilters}
        handleFiltersChange={handleFiltersChange}
      />
      <Box>
        <StyledTableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>{t('columnHeaders.source')}</StyledHeaderCell>
                <StyledHeaderCell>
                  {t('columnHeaders.transferType')}
                </StyledHeaderCell>
                <StyledHeaderCell>{t('columnHeaders.sum')}</StyledHeaderCell>
                <StyledHeaderCell>
                  {t('columnHeaders.template')}
                </StyledHeaderCell>
                <StyledHeaderCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {t('columnHeaders.date')}{' '}
                    <StyledSortIconButton onClick={handleSortByDate}>
                      <UnfoldMore />
                    </StyledSortIconButton>
                  </Box>
                </StyledHeaderCell>
                <StyledHeaderCell></StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((transaction: TransformedTransaction) => (
                  <CustomTableRow
                    key={transaction.id}
                    sourceNumber={transaction.sourceNumber}
                    transferType={transaction.transferType}
                    template={transaction.template}
                    isIncome={transaction.isIncome}
                    date={transaction.date}
                    time={transaction.time}
                    amount={transaction.amount}
                    currency={transaction.currency}
                    handleShowPaymentReceipt={handleShowPaymentReceipt}
                  />
                ))
              ) : (
                <TableRow>
                  <StyledEmptyTableCell colSpan={6}>
                    <StyledEmptyStateContainer>
                      <StyledEmptyStateContent>
                        {emptyTransactionsTableText?.title}
                      </StyledEmptyStateContent>
                      <StyledEmptyStateContent>
                        {emptyTransactionsTableText?.message}
                      </StyledEmptyStateContent>
                    </StyledEmptyStateContainer>
                  </StyledEmptyTableCell>
                </TableRow>
              )}
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

      <PaymentReceiptModal
        open={showPaymentReceipt}
        receiptInfo={paymentReceiptData}
        onClose={() => setShowPaymentReceipt(false)}
      />
    </StyledContainer>
  );
};
