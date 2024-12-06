import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { googlePlayLink, appStoreLink } from '../constants';

import {
  LogoWrapper,
  StyledLink,
  StyledBox,
  StyledFlexBox,
  TypographyGrey,
  StyledTypographyWorkingHours,
  StyledFlexOrderBox,
} from './FooterContacts.styled';

import { useGetContactsQuery, useGetVersionQuery } from 'api/contactInfoApi';
import { GooglePlayIcon, AppStoreIcon, Logo } from 'components/atoms';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setContacts } from 'store/reducers';
import { getContacts } from 'store/selectors';
import { formatPhoneNumber } from 'utils';

export const FooterContacts = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });
  const [skip, setSkip] = useState(true);
  const dispatch = useAppDispatch();
  const { data: version } = useGetVersionQuery(null);
  const { data: contacts } = useGetContactsQuery(null, { skip });
  const currentContacts = useAppSelector(getContacts);
  const {
    id: currentVersion,
    email,
    phoneNumber,
    contactCenterWorkingDays,
    contactCenterWorkingDayBeginTime,
    contactCenterWorkingDayEndTime,
    contactCenterShortenedDays,
    contactCenterShortenedDayBeginTime,
    contactCenterShortenedDayEndTime,
  } = currentContacts;
  const phone = formatPhoneNumber(phoneNumber);

  useEffect(() => {
    if (version) {
      if (currentVersion !== version.id) {
        setSkip(false);
      }
    }
  }, [currentVersion, version]);

  useEffect(() => {
    if (contacts) {
      dispatch(setContacts(contacts));
    }
  }, [contacts]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'column', lg: 'row', sm: 'column' },
        justifyContent: 'space-between',
      }}
      id="contact-section"
    >
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <StyledFlexBox>
        <StyledFlexOrderBox>
          <TypographyGrey variant="body2">{t('download')}</TypographyGrey>
          <StyledBox>
            <Box>
              <RouterLink
                to={googlePlayLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GooglePlayIcon />
              </RouterLink>
            </Box>
            <Box>
              <RouterLink
                to={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppStoreIcon />
              </RouterLink>
            </Box>
          </StyledBox>
        </StyledFlexOrderBox>
        <Box>
          <TypographyGrey variant="body2">{t('contacts.title')}</TypographyGrey>
          <StyledLink href={`tel:${phone}`} mb={0.5}>
            <Typography variant="body2" sx={{ fontSize: { sm: '16px' } }}>
              {phone}
            </Typography>
          </StyledLink>
          <StyledLink href={`mailto:${email}`}>
            <Typography variant="body2" sx={{ fontSize: { sm: '16px' } }}>
              {email}
            </Typography>
          </StyledLink>
        </Box>
        <Box>
          <TypographyGrey variant="body2">
            {t('workingHours.title')}
          </TypographyGrey>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <StyledTypographyWorkingHours variant="body2">
              {contactCenterWorkingDays} {contactCenterWorkingDayBeginTime} -{' '}
              {contactCenterWorkingDayEndTime}
            </StyledTypographyWorkingHours>
            <StyledTypographyWorkingHours variant="body2">
              {contactCenterShortenedDays}: {contactCenterShortenedDayBeginTime}{' '}
              - {contactCenterShortenedDayEndTime}
            </StyledTypographyWorkingHours>
          </Box>
        </Box>
      </StyledFlexBox>
    </Box>
  );
};
