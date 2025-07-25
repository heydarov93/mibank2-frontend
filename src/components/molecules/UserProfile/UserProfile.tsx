import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledAvatar,
  StyledGreetings,
  StyledGreetingsContainer,
  StyledTypography,
  StyledGreetingsName,
  StyledTypographyName,
} from './UserProfile.styled';

import { EGreeting } from 'enums';
import { IUserInfo } from 'models/IUserInfo';

interface UserProfileProps {
  user?: IUserInfo;
  isViceversa?: boolean;
  isShowUserInfo?: boolean;
  captureVariant?: EGreeting;
  isLoading?: boolean;
}
export const UserProfile = ({
  user,
  isViceversa = false,
  isShowUserInfo = true,
  captureVariant = EGreeting.DEFAULT,
  isLoading,
}: UserProfileProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const initials = `${user?.firstName?.charAt(0) ?? ''}${user?.lastName?.charAt(0) ?? ''}`;

  const GreetingMap = {
    [EGreeting.DEFAULT]: (
      <Box>
        <StyledGreetings isViceversa={isViceversa}>
          <StyledTypography>{`${t('greetings')},`}</StyledTypography>
        </StyledGreetings>
        <StyledGreetingsName>
          <StyledTypographyName isViceversa={isViceversa}>
            {!isLoading ? '' : ''}
          </StyledTypographyName>
        </StyledGreetingsName>
      </Box>
    ),
    [EGreeting.EMAIL]: (
      <Box>
        <StyledGreetingsName>
          <StyledTypographyName isViceversa={isViceversa}>
            {!isLoading ? '' : ''}
          </StyledTypographyName>
        </StyledGreetingsName>
        <StyledTypography>{user?.email}</StyledTypography>
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
