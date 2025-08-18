import { Box, CardActionArea, CircularProgress, Popover } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OpenDepositDetailsModal } from '../DepositDetailsModal/DepositDetailsModal';
import { EmptySection } from '../Sidebar/molecules';
import { useUserDepositDetailed } from '../TransferView/hooks/user-deposits/useUserDeposit';

import {
  StyledHeader,
  StyledMain,
  StyledProgressBar,
} from './DashboardDepositEntry.styled';

import { IDepositBase } from 'api/services/deposit-service/types/user-deposits.types';
import {
  getDaysDiff,
  formatDaysToMonths,
  getTimeLeft,
} from 'utils/helpers/dateHelpers';

interface DashboardDepositEntryProps {
  depositData: IDepositBase;
}

export const DashboardDepositEntry = ({
  depositData,
}: DashboardDepositEntryProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });

  const { data, isError, isLoading } = useUserDepositDetailed(depositData.id);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (isError || !data) {
    return <EmptySection description={t('emptySectionConnectionError')} />;
  }

  //todo BE timeLeft returns wrong calculations, remove getTimeLeft after fix
  const { endDate, startDate, name, amount, currency } = data;

  const allDays = getDaysDiff(endDate, startDate);
  const timeLeft = getTimeLeft(endDate);

  const progressBarValue =
    timeLeft > 0 ? Math.max(0, 100 - (100 * timeLeft) / allDays) : 100;

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
          data={data}
        />
      </Popover>
    </>
  );
};
