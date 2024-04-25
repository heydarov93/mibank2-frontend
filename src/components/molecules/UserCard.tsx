import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledAvatar,
  StyledGreetings,
  StyledGreetingsContainer,
  StyledGreetingsName,
} from './UserCard.styled';

type PersonalMenuProps = {
  user: {
    firstName: string;
    lastName: string;
  };
  isViceversa?: boolean;
};
export const UserCard = ({ user, isViceversa = false }: PersonalMenuProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <StyledGreetingsContainer isViceversa={isViceversa}>
      <Box>
        <StyledGreetings isViceversa={isViceversa}>
          <Typography sx={{ lineHeight: '16px' }} variant="caption">
            {`${t('greetings')},`}
          </Typography>
        </StyledGreetings>
        <StyledGreetingsName>
          <Typography sx={{ lineHeight: '24px' }} variant="body1">
            {user.firstName}
          </Typography>
        </StyledGreetingsName>
      </Box>
      <StyledAvatar>{initials}</StyledAvatar>
    </StyledGreetingsContainer>
  );
};
