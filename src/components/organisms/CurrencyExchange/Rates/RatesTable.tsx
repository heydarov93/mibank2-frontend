import {
  Alert,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  CellBox,
  StyledCellText,
  StyledHeadCell,
  StyledTableContainer,
  StyledTableTitle,
  TrendingDownIcon,
  TrendingUpIcon,
} from './Rates.styled';

import {
  useGetCurrentRatesQuery,
  useGetPreviousRatesQuery,
} from 'api/getExchangeRatesApi';
import { CurrencyFlagIcon } from 'components/atoms';
import { TCurrency } from 'components/atoms/CurrencyFlagIcon/CurrencyFlagIcon';
import currencies from 'constants/currencies';

type TableError = string | null;

interface Rate {
  currency: string;
  code: TCurrency;
  bid: number;
  ask: number;
}

export const RatesTable = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.currencyExchange.ratesTable',
  });
  const theme = useTheme();

  const {
    data: currentRates,
    isLoading: isLoadingCurrent,
    isError: isCurrentRatesError,
  } = useGetCurrentRatesQuery(null);

  const {
    data: previousRates,
    isLoading: isLoadingPrevious,
    isError: isPreviousRatesError,
  } = useGetPreviousRatesQuery(null);

  const isRatesDataLoading =
    !currentRates?.[0].rates ||
    !previousRates?.[0].rates ||
    isCurrentRatesError ||
    isPreviousRatesError ||
    isLoadingCurrent ||
    isLoadingPrevious;

  const isRatesError = isCurrentRatesError || isPreviousRatesError;
  const errorMessage: TableError = isRatesError ? t('errorMessage') : null;

  if (isRatesDataLoading) {
    return <CircularProgress />;
  }

  const filteredCurrencies = currentRates[0].rates.filter((rate: Rate) =>
    currencies.includes(rate.code),
  );

  const previousRatesMap = new Map<string, Rate>(
    previousRates[0].rates.map((rate: Rate) => [rate.code, rate]),
  );

  return (
    <Box>
      <StyledTableTitle>{t('title')}</StyledTableTitle>

      {isRatesError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledHeadCell>{t('currencyColumnLabel')}</StyledHeadCell>
              <StyledHeadCell>{t('buyRateColumnLabel')}</StyledHeadCell>
              <StyledHeadCell>{t('sellRateColumnLabel')}</StyledHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCurrencies.map((rate: Rate, index: number) => {
              const previousRate = previousRatesMap.get(rate.code);

              const isBidIncreased =
                previousRate && rate.bid > previousRate.bid;
              const isBidDecreased =
                previousRate && rate.bid < previousRate.bid;
              const isAskIncreased =
                previousRate && rate.ask > previousRate.ask;
              const isAskDecreased =
                previousRate && rate.ask < previousRate.ask;

              return (
                <TableRow
                  key={rate.code}
                  sx={{
                    backgroundColor:
                      index % 2 === 1
                        ? theme.palette.bg.lightBlue
                        : 'transparent',
                  }}
                >
                  <TableCell sx={{ border: 'none' }}>
                    <CellBox>
                      <CurrencyFlagIcon currency={rate.code} />
                      <StyledCellText
                        sx={{ fontWeight: 500, marginLeft: '12px' }}
                      >
                        {rate.code == currencies.at(-1)
                          ? `100 ${rate.code}`
                          : `1 ${rate.code}`}
                      </StyledCellText>
                    </CellBox>
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    <CellBox>
                      {isBidIncreased ? (
                        <TrendingUpIcon data-testid={'TrendingUpIcon'} />
                      ) : isBidDecreased ? (
                        <TrendingDownIcon data-testid={'TrendingDownIcon'} />
                      ) : null}
                      <StyledCellText data-testid={`bid-${rate.code}`}>
                        {rate.bid}
                      </StyledCellText>
                    </CellBox>
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    <CellBox>
                      {isAskIncreased ? (
                        <TrendingUpIcon data-testid={'TrendingUpIcon'} />
                      ) : isAskDecreased ? (
                        <TrendingDownIcon data-testid={'TrendingDownIcon'} />
                      ) : null}
                      <StyledCellText data-testid={`ask-${rate.code}`}>
                        {rate.ask}
                      </StyledCellText>
                    </CellBox>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};
