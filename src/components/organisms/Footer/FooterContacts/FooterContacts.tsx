import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { googlePlayLink, contactLinks, workingHours } from '../constants';

import {
  LogoWrapper,
  StyledLink,
  StyledFlexBox,
  TypographyGrey,
} from './FooterContacts.styled';

import { GooglePlayIcon } from 'components/atoms/GooglePlayIcon';
import { Logo } from 'components/atoms/Logo';

export const FooterContacts = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });
  const { phone, email } = contactLinks;
  const { lines } = workingHours;
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
      }}
    >
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <StyledFlexBox>
        <Box sx={{ order: { xs: 0, sm: 4 } }}>
          <TypographyGrey variant="body2">{t('download')}</TypographyGrey>
          <RouterLink
            to={googlePlayLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GooglePlayIcon />
          </RouterLink>
        </Box>
        <Box>
          <TypographyGrey variant="body2">{t('contacts.title')}</TypographyGrey>
          <StyledLink href={`tel:${phone}`} mb={0.5}>
            <Typography variant="body2" sx={{ fontSize: { sm: '16px' } }}>
              {t(`contacts.phone`)}
            </Typography>
          </StyledLink>
          <StyledLink href={`mailto:${email}`}>
            <Typography variant="body2" sx={{ fontSize: { sm: '16px' } }}>
              {t(`contacts.email`)}
            </Typography>
          </StyledLink>
        </Box>
        <Box>
          <TypographyGrey variant="body2">
            {t('workingHours.title')}
          </TypographyGrey>
          <Box display="flex" flexDirection="column" gap={0.5}>
            {lines.map((line) => (
              <Typography
                variant="body2"
                sx={{
                  fontSize: { sm: '16px' },
                  color: theme.palette.common.black,
                }}
                key={line}
              >
                {t(`workingHours.${line}`)}
              </Typography>
            ))}
          </Box>
        </Box>
      </StyledFlexBox>
    </Box>
  );
};
