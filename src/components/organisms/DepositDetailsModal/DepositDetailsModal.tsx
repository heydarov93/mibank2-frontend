import { Box, IconButton, TableHead, Typography } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  DetailsHeader,
  FirstColumnHeader,
  HeaderBox,
  StyledBlueBox,
  StyledButton,
  StyledSecondRowText,
  StyledStatusChip,
  StyledTitle,
} from './DepositDetailsModal.styled';
import { theme } from 'theme/theme';
import { IUserDeposit } from 'api/services/deposit-service/types/deposits.types';
import { useTranslation } from 'react-i18next';
import { formatDateByPattern } from 'utils';
import { formatDaysToMonths } from 'utils/helpers/dateHelpers';
import { CoinsStackedIcon } from 'components/atoms/CoinsStackedIcon/CoinsStackedIcon';

interface OpenDepositDetailsModalProps {
  onClose: () => void;
  data: IUserDeposit;
}

export const OpenDepositDetailsModal = ({
  onClose,
  data,
}: OpenDepositDetailsModalProps) => {
  const { t } = useTranslation('translation');
  const timeDescription = formatDaysToMonths(data.timeLeft);
  return (
    <StyledBlueBox>
      <DetailsHeader>
        <StyledTitle>{t('Homepage.sidebar.depositDetails.title')}</StyledTitle>
        <IconButton onClick={onClose} aria-label={t('common.close')}>
          <CloseIcon />
        </IconButton>
      </DetailsHeader>
      <Box>
        <TableContainer
          component={Paper}
          sx={{
            border: `1px solid ${theme.palette.border.lightBlue}`,
            borderRadius: '8px',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <HeaderBox>
                    <FirstColumnHeader>
                      <CoinsStackedIcon
                        sx={{
                          width: '38px',
                          height: '38px',
                          mr: 1,
                          '& svg path': {
                            stroke: theme.palette.primary.dark,
                          },
                        }}
                      />
                      <StyledTitle
                        sx={{
                          fontWeight: 600,
                          fontSize: 18,
                          lineHeight: '28px',
                        }}
                      >
                        {data.name}
                      </StyledTitle>
                    </FirstColumnHeader>
                    <StyledStatusChip label={'Active'} />
                  </HeaderBox>
                </TableCell>
                <TableCell>
                  {data.amount} {data.currency}
                  <br />
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: '20px',
                      color: theme.palette.grey[400],
                    }}
                  >
                    {t('Homepage.sidebar.depositDetails.amount')}
                  </Typography>
                </TableCell>
                <TableCell>
                  {timeDescription}
                  <br />
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: '20px',
                      color: theme.palette.grey[400],
                    }}
                  >
                    {t('Homepage.sidebar.depositDetails.timeLeft')}
                  </Typography>
                </TableCell>
                <TableCell>
                  {formatDateByPattern(data.endDate, 'MM/DD/YYYY')}
                  <br />
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: '20px',
                      color: theme.palette.grey[400],
                    }}
                  >
                    {t('Homepage.sidebar.depositDetails.endDate')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.custom.gray[500],
                  border: `1px solid ${theme.palette.border.lightBlue}`,
                }}
              >
                <TableCell>
                  <StyledSecondRowText>
                    {t('Homepage.sidebar.depositDetails.accNumber')}
                  </StyledSecondRowText>
                </TableCell>
                <TableCell>
                  <StyledSecondRowText>
                    {t('Homepage.sidebar.depositDetails.startDate')}
                  </StyledSecondRowText>
                </TableCell>
                <TableCell>
                  <StyledSecondRowText>
                    {t('Homepage.sidebar.depositDetails.type')}
                  </StyledSecondRowText>
                </TableCell>
                <TableCell>
                  <StyledSecondRowText>
                    {t('Homepage.sidebar.depositDetails.interestRate')}
                  </StyledSecondRowText>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{data.accountNumber}</TableCell>
                <TableCell>
                  {formatDateByPattern(data.startDate, 'MM/DD/YYYY')}
                </TableCell>
                <TableCell>{data.type}</TableCell>
                <TableCell>{data.interestRate}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <StyledButton>
          {t('Homepage.sidebar.depositDetails.withdrawButton')}
        </StyledButton>
      </Box>
    </StyledBlueBox>
  );
};
