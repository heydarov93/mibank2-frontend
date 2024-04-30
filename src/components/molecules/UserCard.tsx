import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledAvatar,
  StyledGreetings,
  StyledGreetingsContainer,
  StyledTypographyBoldName,
  StyledTypography,
  StyledGreetingsName,
} from './UserCard.styled';

import { EGreeting } from 'constants/index';

type PersonalMenuProps = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  isViceversa?: boolean;
  isShowUserInfo?: boolean;
  captureVariant?: EGreeting;
};
export const UserCard = ({
  user,
  isViceversa = false,
  isShowUserInfo = true,
  captureVariant = EGreeting.DEFAULT,
}: PersonalMenuProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  const fullName = `${user.firstName} ${user.lastName}`;

  const GreetingMap = {
    [EGreeting.DEFAULT]: (
      <Box>
        <StyledGreetings isViceversa={isViceversa}>
          <StyledTypography>{`${t('greetings')},`}</StyledTypography>
        </StyledGreetings>
        <StyledGreetingsName>
          <StyledTypography>{fullName}</StyledTypography>
        </StyledGreetingsName>
      </Box>
    ),
    [EGreeting.EMAIL]: (
      <Box>
        <StyledGreetingsName>
          <StyledTypographyBoldName>{fullName}</StyledTypographyBoldName>
        </StyledGreetingsName>
        <StyledTypography>{user.email}</StyledTypography>
      </Box>
    ),
  };

  return (
    <StyledGreetingsContainer isViceversa={isViceversa}>
      {isShowUserInfo ? GreetingMap[captureVariant as EGreeting] : null}
      <StyledAvatar>{initials}</StyledAvatar>
    </StyledGreetingsContainer>
  );
};
