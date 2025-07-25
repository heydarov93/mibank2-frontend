import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import {
  LogoWrapper,
  StyledBox,
  StyledFlexBox,
  StyledFlexOrderBox,
  StyledLink,
  StyledTypographyWorkingHours,
  TypographyGrey,
} from './FooterContacts.styled';

import {
  useGetContactsQuery,
  useGetContactVersionQuery,
} from 'api/services/contact-information-service/contacts.api';
import { AppStoreIcon, GooglePlayIcon, Logo } from 'components/atoms';
import { TO_APP_STORE, TO_GOOGLE_PLAY } from 'constants/navigation/routePaths';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getContacts, setContacts } from 'store/slices/contacts';
import { formatPhoneNumber } from 'utils/formatters';

export const FooterContacts = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });
  const [skip, setSkip] = useState(true);
  const dispatch = useAppDispatch();
  const { data: version } = useGetContactVersionQuery(null);
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
                to={TO_GOOGLE_PLAY}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GooglePlayIcon />
              </RouterLink>
            </Box>
            <Box>
              <RouterLink
                to={TO_APP_STORE}
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
