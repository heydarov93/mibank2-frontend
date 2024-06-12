import { Box } from '@mui/material';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

import {
  StyledAvatar,
  StyledGreetings,
  StyledGreetingsContainer,
  StyledTypography,
  StyledGreetingsName,
  StyledTypographyName,
} from './UserCard.styled';

import { useGetUserInfoQuery } from 'api/userInfoApi';
import { EGreeting } from 'constants/index';
import { useAppDispatch } from 'hooks/hook';
import { IUserInfo } from 'models/IUserInfo';
import { setUserData } from 'store/reducers/AuthSlice';

type PersonalMenuProps = {
  user: IUserInfo;
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
  const dispatch = useAppDispatch();
  
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  
  const { data, isLoading } = useGetUserInfoQuery();
  
  const blankFullName = `${user.firstName} ${user.lastName}`;

  const initials = `${data?.firstName?.charAt(0) ?? ''}${data?.lastName?.charAt(0) ?? ''}`;
  
  const fullName = `${data?.firstName} ${data?.lastName}`;
  
  useEffect(() => {
    if (!isLoading) {
      dispatch(setUserData(data));
    }
  }, [isLoading]);

  const GreetingMap = {
    [EGreeting.DEFAULT]: (
      <Box>
        <StyledGreetings isViceversa={isViceversa}>
          <StyledTypography>{`${t('greetings')},`}</StyledTypography>
        </StyledGreetings>
        <StyledGreetingsName>
          <StyledTypographyName isViceversa={isViceversa}>
            {!isLoading ? fullName : blankFullName}
          </StyledTypographyName>
        </StyledGreetingsName>
      </Box>
    ),
    [EGreeting.EMAIL]: (
      <Box>
        <StyledGreetingsName>
          <StyledTypographyName isViceversa={isViceversa}>
            {!isLoading ? fullName : blankFullName}
          </StyledTypographyName>
        </StyledGreetingsName>
        <StyledTypography>{data?.email}</StyledTypography>
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
