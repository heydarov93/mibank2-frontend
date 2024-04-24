import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { termsLink } from '../constants';

import { StyledBottomBox, StyledBox } from './FooterTerms.styled';

export const FooterTerms = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });
  return (
    <StyledBox>
      <StyledBottomBox sx={{ order: { xs: 0, sm: 2 } }}>
        <Link
          component={RouterLink}
          to={termsLink}
          color="inherit"
          variant="body2"
          underline="hover"
        >
          {t('footerBottom.terms')}
        </Link>
      </StyledBottomBox>
      <StyledBottomBox>
        <Typography variant="body2">{t('footerBottom.copyright')}</Typography>
      </StyledBottomBox>
    </StyledBox>
  );
};


