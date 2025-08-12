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
import { paymentReceiptDataConverter } from './utils/paymentReceiptDataConverter';

import { useGetTransactionDetailsQuery } from 'api/services/account-service/transactions.api';
import { CustomTablePagination, CustomTableRow } from 'components/molecules';
import { DEFAULT_PAGE_SIZE } from 'constants/business/pagination';
import { SORT_ORDER } from 'constants/business/sortOrder';
import { usePaginationInfo } from 'hooks';
import { IRawTransaction, ITransformedTransaction } from 'models/ITransaction';
import {
  formatCardNumber,
  formatTransactionDate,
  formatIbanNumber,
} from 'utils/formatters';
import { TTransactionFiltersValues } from 'validation';

export const TransactionsTable = () => {
  const [page, setPage] = useState(0);
  const [showPaymentReceipt, setShowPaymentReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState<string>('');
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

  const { data: transactionDetails } = useGetTransactionDetailsQuery(
    {
      transactionId,
    },
    {
      skip: !transactionId,
    },
  );

  const { totalPages, pageDisplayText } = usePaginationInfo(
    transactionsLength,
    page,
    rowsPerPage,
  );

  const { t } = useTranslation('translation', {
    keyPrefix: 'TransactionsHistoryPage',
  });

  const paginatedData = useMemo(() => {
    return transactionsList.map((transaction: IRawTransaction) => {
      const { date, time } = formatTransactionDate(transaction.dateTime);

      const transformedTransaction: ITransformedTransaction = {
        id: transaction.id,
        sourceNumber:
          transaction.transferType === 'CARD'
            ? formatCardNumber(transaction.source)
            : formatIbanNumber(transaction.source),
        amount: transaction.totalAmount,
        transferType: transaction.transferType === 'CARD' ? 'Card' : 'Account',
        isIncome: transaction.type === 'INCOME',
        template: 'Salary', //TODO: Placeholder for template, will be replaced with actual data
        date,
        time,
        currency: transaction.currencyCode,
      };

      return transformedTransaction;
    });
  }, [transactionsList]);

  const paymentReceiptData = useMemo(
    () => paymentReceiptDataConverter(transactionDetails),
    [transactionDetails],
  );

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

  const handleShowPaymentReceipt = (id: string) => {
    setShowPaymentReceipt(true);
    setTransactionId(id);
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
                paginatedData.map((transaction: ITransformedTransaction) => (
                  <CustomTableRow
                    key={transaction.id}
                    id={transaction.id}
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
      {paymentReceiptData && (
        <PaymentReceiptModal
          open={showPaymentReceipt}
          receiptInfo={paymentReceiptData}
          onClose={() => setShowPaymentReceipt(false)}
        />
      )}
    </StyledContainer>
  );
};
