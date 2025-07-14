import { Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledBox, StyledPageWrapper } from './ErrorPage.styled';

import { TO_HOME } from 'constants/navigation/routePaths';


export const ErrorPage = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'ErrorPage',
  });

  return (
    <StyledPageWrapper>
      <StyledBox>
        <Typography variant="h2">{t('title')}</Typography>
        <Typography variant="body1">{t('subTitle')}</Typography>
        <Typography variant="body1">
          {t('text')} <Link href={TO_HOME}>{t('linkText')}</Link>
        </Typography>
      </StyledBox>
    </StyledPageWrapper>
  );
};
