import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { termsLink, policyLink } from '../constants';

import { StyledBottomBox, StyledBox } from './FooterTerms.styled';

export const FooterTerms = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });

  const generateRandomParam = () => {
    return `?${Math.random().toString(36).substring(7)}`;
  };

  const urlTerms = `${termsLink}${generateRandomParam()}`;
  const urlPolicy = `${policyLink}${generateRandomParam()}`;
  return (
    <StyledBox>
      <StyledBottomBox sx={{ order: { xs: 0, sm: 2 } }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Link
            href={urlTerms}
            target="_blank"
            color="inherit"
            variant="body2"
            underline="hover"
          >
            {t('footerBottom.terms')}
          </Link>
          <Typography variant="body2">{t('footerBottom.and')}</Typography>
          <Link
            href={urlPolicy}
            target="_blank"
            color="inherit"
            variant="body2"
            underline="hover"
          >
            {t('footerBottom.policy')}
          </Link>
        </Box>
      </StyledBottomBox>
      <StyledBottomBox>
        <Typography variant="body2">{t('footerBottom.copyright')}</Typography>
      </StyledBottomBox>
    </StyledBox>
  );
};
