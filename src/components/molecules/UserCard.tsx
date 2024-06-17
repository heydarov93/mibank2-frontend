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
import { useAppDispatch, useAppSelector } from 'hooks/hook';
import { IUserInfo } from 'models/IUserInfo';
import { setUserData } from 'store/reducers/AuthSlice';
import { getUser } from 'store/selectors/AuthSelectors';

type PersonalMenuProps = {
  user?: IUserInfo;
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
  
  const email = useAppSelector(getUser)?.email;

  const { data, isLoading } = useGetUserInfoQuery(email);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setUserData(data));
    }
  }, [isLoading]);
  
  user = useAppSelector(getUser);
  const initials = `${user?.firstName?.charAt(0) ?? ''}${user?.lastName?.charAt(0) ?? ''}`;
  const fullName = `${user?.firstName} ${user?.lastName}`;

  const GreetingMap = {
    [EGreeting.DEFAULT]: (
      <Box>
        <StyledGreetings isViceversa={isViceversa}>
          <StyledTypography>{`${t('greetings')},`}</StyledTypography>
        </StyledGreetings>
        <StyledGreetingsName>
          <StyledTypographyName isViceversa={isViceversa}>
            {!isLoading ? fullName : ""}
          </StyledTypographyName>
        </StyledGreetingsName>
      </Box>
    ),
    [EGreeting.EMAIL]: (
      <Box>
        <StyledGreetingsName>
          <StyledTypographyName isViceversa={isViceversa}>
            {!isLoading ? fullName : ""}
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
