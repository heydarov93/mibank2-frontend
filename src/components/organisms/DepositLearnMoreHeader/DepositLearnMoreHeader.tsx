import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Button } from '@mui/material';

import { StyledCloseButton } from '../ConfirmTransferModal/ConfirmTransferModal.styled';

import { StyledTitle } from 'components/molecules/DepositCreationForm/DepositCreationForm.styled';

interface DepositLearnMoreHeaderProps {
  onBack: () => void;
  label: string;
}
export const DepositLearnMoreHeader = ({
  onBack,
  label,
}: DepositLearnMoreHeaderProps) => {
  return (
    <Box
      sx={({ spacing, palette }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing(5),
        paddingBottom: '0',
        backgroundColor: palette.primary.light,
      })}
    >
      <Box>
        <Button
          onClick={onBack}
          data-testid="back-button"
          aria-label="Go back"
          size="large"
          sx={() => ({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <ArrowBackIosIcon
            sx={({ palette }) => ({
              width: '24px',
              height: '24px',
              color: palette.grey[400],
            })}
          />
          <StyledTitle>{label}</StyledTitle>
        </Button>
      </Box>
      <StyledCloseButton
        onClick={onBack}
        data-testid="modal-close-button"
        aria-label="Close modal"
      >
        <CloseRoundedIcon />
      </StyledCloseButton>
    </Box>
  );
};
