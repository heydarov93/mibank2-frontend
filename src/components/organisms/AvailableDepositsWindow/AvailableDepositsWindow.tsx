import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  ListItem,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  MainContainer,
  StyledDepositList,
  StyledHeader,
} from './AvailableDepositsWindow.styled';
import { ErrorMessage } from './atoms';

import { useGetDepositsQuery } from 'api/services/deposit-service/deposits.api';
import { CloseButton } from 'components/atoms';
import { DepositBox } from 'components/molecules';
import { depositBoxImages } from 'components/molecules/DepositBox/DepositBox';
import { IDeposit } from 'models/IDepositInfo';

interface AvailableDepositsWindowProps {
  open: boolean;
  onSelectDeposit: (deposit: IDeposit) => void;
  onClose: () => void;
  onSetLearnDeposit: (deposit: IDeposit) => void;
}

export const AvailableDepositsWindow = ({
  open,
  onClose,
  onSelectDeposit,
  onSetLearnDeposit,
}: AvailableDepositsWindowProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'DepositWindow' });
  const {
    data: deposits,
    isLoading: isLoadingDeposits,
    isError: isDepositsError,
  } = useGetDepositsQuery({});
  const { spacing, palette } = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxHeight: `calc(100vh - ${spacing(7.5)})`,
          height: 'auto',
          top: '60px',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        },
      }}
    >
      <MainContainer data-testid="available-deposits-window">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
        >
          <StyledHeader>{t('availableDeposits')}</StyledHeader>
          <CloseButton onClick={onClose} />
        </Box>
        <StyledDepositList>
          {isDepositsError ? (
            <ErrorMessage />
          ) : isLoadingDeposits ? (
            <CircularProgress />
          ) : (
            deposits?.content?.map((item, i) => {
              const { id, currency, description, term, name, interestRate } =
                item;

              return (
                <ListItem sx={{ padding: 0 }} key={id}>
                  <DepositBox
                    depositCurrency={currency}
                    depositDescription={description}
                    depositDuration={term}
                    depositName={name}
                    depositRate={interestRate}
                    depositImgSrc={
                      depositBoxImages[i % depositBoxImages.length]
                    }
                    secondaryButton={
                      <Button
                        style={{ color: palette.primary.main }}
                        onClick={() => {
                          onSetLearnDeposit(item);
                          onClose();
                        }}
                      >
                        {t('learnMore')}
                      </Button>
                    }
                    onOpenDepositForm={() => {
                      onSelectDeposit(item);
                    }}
                  />
                </ListItem>
              );
            })
          )}
        </StyledDepositList>
      </MainContainer>
    </Drawer>
  );
};
