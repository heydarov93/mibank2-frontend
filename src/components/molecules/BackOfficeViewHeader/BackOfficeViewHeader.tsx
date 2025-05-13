import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { PrimaryHeader, SecondaryHeader } from './BackOfficeViewHeader.styled';

import { SubmitButton } from 'components/atoms';
import ButtonPlusIcon from 'components/atoms/ButtonPlusIcon/ButtonPlusIcon';

interface BackOfficeViewHeaderProps {
  primaryHeader: string;
  secondaryHeader: string;
  btnContent: string;
  path: string;
}

export const BackOfficeViewHeader = ({
  primaryHeader,
  secondaryHeader,
  btnContent,
  path,
}: BackOfficeViewHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <PrimaryHeader>{primaryHeader}</PrimaryHeader>
        <SecondaryHeader>{secondaryHeader}</SecondaryHeader>
      </Box>
      <SubmitButton
        sx={{
          width: '170px',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: 0,
        }}
        buttonContent={btnContent}
        startIcon={<ButtonPlusIcon />}
        onClick={() => {
          navigate(path);
        }}
      />
    </Box>
  );
};
