import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledAvatar,
  StyledGreetings,
  StyledGreetingsContainer,
  StyledTypography,
  StyledGreetingsName,
  StyledTypographyName,
} from './UserCard.styled';

import { EGreeting } from 'constants/index';
import { IUser } from 'models/IAuth';

type PersonalMenuProps = {
  user: IUser;
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
  const initials = `${user.name?.charAt(0) ?? ''}${user.family_name?.charAt(0) ?? ''}`;

  const fullName = `${user.name} ${user.family_name}`;

  const GreetingMap = {
    [EGreeting.DEFAULT]: (
      <Box>
        <StyledGreetings isViceversa={isViceversa}>
          <StyledTypography>{`${t('greetings')},`}</StyledTypography>
        </StyledGreetings>
        <StyledGreetingsName>
          <StyledTypographyName isViceversa={isViceversa}>
            {fullName}
          </StyledTypographyName>
        </StyledGreetingsName>
      </Box>
    ),
    [EGreeting.EMAIL]: (
      <Box>
        <StyledGreetingsName>
          <StyledTypographyName isViceversa={isViceversa}>
            {fullName}
          </StyledTypographyName>
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
