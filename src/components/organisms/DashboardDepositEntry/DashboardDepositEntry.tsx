import { CardActionArea, Popover } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledHeader,
  StyledMain,
  StyledProgressBar,
} from './DashboardDepositEntry.styled';

import { IUserDeposit } from 'api/services/deposit-service/types/deposits.types';
import { getDaysDiff, formatDaysToMonths } from 'utils/helpers/dateHelpers';
import { OpenDepositDetailsModal } from '../DepositDetailsModal/DepositDetailsModal';

interface DashboardDepositEntryProps {
  depositData: IUserDeposit;
}

export const DashboardDepositEntry = ({
  depositData,
}: DashboardDepositEntryProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { endDate, startDate, timeLeft, name, amount, currency } = depositData;
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });

  const allDays = getDaysDiff(endDate, startDate);
  const progressBarValue =
    allDays > 0
      ? Math.min(100, Math.max(0, 100 - (100 * timeLeft) / allDays))
      : 0;

  const timeDescription = formatDaysToMonths(timeLeft);
  return (
    <>
      <Card
        sx={{
          boxShadow: 'none',
          '&:hover': {
            transform: 'scale(1.02)',
            cursor: 'pointer',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <CardActionArea
          disableRipple
          onClick={handleClick}
          sx={{
            '& .MuiCardActionArea-focusHighlight': {
              opacity: '0',
              backgroundColor: 'transparent',
            },
          }}
        >
          <StyledHeader>{name}</StyledHeader>
          <StyledMain>
            <Typography>{`${amount} ${currency}`}</Typography>
            <Typography>{timeDescription}</Typography>
          </StyledMain>
          <StyledProgressBar value={progressBarValue} variant="determinate" />
        </CardActionArea>
      </Card>
      <Popover
        disableScrollLock={true}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              boxShadow: 2,
              p: 2,
              ml: 3,
              width: '100%',
              maxWidth: 1200,
              minWidth: 300,
            },
          },
        }}
      >
        <OpenDepositDetailsModal
          onClose={() => setAnchorEl(null)}
          data={depositData}
        />
      </Popover>
    </>
  );
};
