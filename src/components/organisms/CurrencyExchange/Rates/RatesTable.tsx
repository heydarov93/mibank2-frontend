import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import {
  StyledHeadCell,
  StyledTableContainer,
  StyledCellText,
  StyledTableTitle,
} from './Rates.styled';

import { useGetExchangeRatesQuery } from 'api/getExchangeRatesApi';
import { ReactComponent as ChfIcon } from 'assets/icons/ChfFlag.svg';
import { ReactComponent as EurIcon } from 'assets/icons/EurFlag.svg';
import { ReactComponent as GbpIcon } from 'assets/icons/GbpFlag.svg';
import { ReactComponent as JpyIcon } from 'assets/icons/JpyFlag.svg';
import { ReactComponent as SpinningArrowButton } from 'assets/icons/Reload.svg';
import { ReactComponent as UsaIcon } from 'assets/icons/UsaFlag.svg';

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
  const { t } = useTranslation('translation');
  const theme = useTheme();
  const currentDate = dayjs().format('YYYY-MM-DD');
  const { data, isLoading } = useGetExchangeRatesQuery(currentDate);
  const requiredCurrencies = ['USD', 'EUR', 'GBP', 'CHF', 'JPY'];

  if (isLoading) return <SpinningArrowButton />;

  const filteredCurrencies =
    data[0]?.rates.filter((rate: Rate) =>
      requiredCurrencies.includes(rate.code),
    ) || [];

  return (
    <Box width={'50%'}>
      <StyledTableTitle marginBottom="14px">
        {t('MainPage.rates.title')}
      </StyledTableTitle>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledHeadCell>
                {t('MainPage.rates.table.currencyColumnLabel')}
              </StyledHeadCell>
              <StyledHeadCell>
                {t('MainPage.rates.table.buyRateColumnLabel')}
              </StyledHeadCell>
              <StyledHeadCell>
                {t('MainPage.rates.table.sellRateColumnLabel')}
              </StyledHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCurrencies?.map((rate: Rate, index: number) => {
              const FlagIcon = flagIcons[rate.code];

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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FlagIcon />
                      <StyledCellText
                        sx={{
                          fontWeight: 500,
                          marginLeft: '12px',
                        }}
                      >
                        {rate.code === 'JPY'
                          ? `100 ${rate.code}`
                          : `1 ${rate.code}`}
                      </StyledCellText>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpRoundedIcon
                        sx={{
                          marginRight: '8px',
                          width: '18px',
                          height: '18px',
                          color: theme.palette.success.main,
                        }}
                      />
                      <StyledCellText>{rate.bid.toFixed(4)}</StyledCellText>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingDownRoundedIcon
                        sx={{
                          marginRight: '8px',
                          width: '18px',
                          height: '18px',
                          color: theme.palette.error.main,
                        }}
                      />
                      <StyledCellText>{rate.ask.toFixed(4)}</StyledCellText>
                    </Box>
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
