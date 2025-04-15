import {
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
import { ReactComponent as ChfIcon } from 'assets/icons/ChfFlag.svg';
import { ReactComponent as EurIcon } from 'assets/icons/EurFlag.svg';
import { ReactComponent as GbpIcon } from 'assets/icons/GbpFlag.svg';
import { ReactComponent as JpyIcon } from 'assets/icons/JpyFlag.svg';
import { ReactComponent as UsaIcon } from 'assets/icons/UsaFlag.svg';
import currencies from 'constants/currencies';

interface Rate {
  currency: string;
  code: string;
  bid: number;
  ask: number;
}

const flagIcons: Record<string, React.FC> = {
  USD: UsaIcon,
  EUR: EurIcon,
  GBP: GbpIcon,
  CHF: ChfIcon,
  JPY: JpyIcon,
};

export const RatesTable = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'MainPage' });
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
    <Box width={'50%'}>
      <StyledTableTitle>{t('ratesTable.title')}</StyledTableTitle>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledHeadCell>
                {t('ratesTable.currencyColumnLabel')}
              </StyledHeadCell>
              <StyledHeadCell>
                {t('ratesTable.buyRateColumnLabel')}
              </StyledHeadCell>
              <StyledHeadCell>
                {t('ratesTable.sellRateColumnLabel')}
              </StyledHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCurrencies.map((rate: Rate, index: number) => {
              const FlagIcon = flagIcons[rate.code];
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
                      <FlagIcon />
                      <StyledCellText
                        sx={{ fontWeight: 500, marginLeft: '12px' }}
                      >
                        {rate.code}
                      </StyledCellText>
                    </CellBox>
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    <CellBox>
                      {isBidIncreased ? (
                        <TrendingUpIcon />
                      ) : isBidDecreased ? (
                        <TrendingDownIcon />
                      ) : (
                        '-'
                      )}
                      <StyledCellText>{rate.bid.toFixed(4)}</StyledCellText>
                    </CellBox>
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    <CellBox>
                      {isAskIncreased ? (
                        <TrendingUpIcon />
                      ) : isAskDecreased ? (
                        <TrendingDownIcon />
                      ) : (
                        '-'
                      )}
                      <StyledCellText>{rate.ask.toFixed(4)}</StyledCellText>
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
