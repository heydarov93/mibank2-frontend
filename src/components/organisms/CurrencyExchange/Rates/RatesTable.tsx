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
import { useTranslation } from 'react-i18next';

import {
  StyledCellText,
  StyledHeadCell,
  StyledTableContainer,
  StyledTableTitle,
} from './Rates.styled';

// TODO: Adding Api call to populate the currency rate(below is mockData)
const currencyRates = [
  { currency: 'USD', buyRate: 1.0, sellRate: 1.0 },
  { currency: 'EUR', buyRate: 1.0, sellRate: 1.0 },
  { currency: 'GBP', buyRate: 1.0, sellRate: 1.0 },
  { currency: 'CHF', buyRate: 1.0, sellRate: 1.0 },
  { currency: 'JPY', buyRate: 1.0, sellRate: 1.0 },
];

export const RatesTable = () => {
  const { t } = useTranslation('translation');
  const theme = useTheme();

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
            {currencyRates.map((rate, index) => (
              <TableRow
                key={rate.currency}
                sx={{
                  backgroundColor:
                    index % 2 === 1
                      ? theme.palette.bg.lightBlue
                      : 'transparent',
                }}
              >
                <TableCell sx={{ border: 'none' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StyledCellText
                      sx={{ fontWeight: 500 }}
                    >{`1 ${rate.currency}`}</StyledCellText>
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
                    <StyledCellText>{rate.buyRate.toFixed(4)}</StyledCellText>
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
                    <StyledCellText>{rate.sellRate.toFixed(4)}</StyledCellText>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};
