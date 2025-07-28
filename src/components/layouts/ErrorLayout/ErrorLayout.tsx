import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { StyledBox, StyledPageWrapper } from './ErrorLayout.styled';

import { TO_HOME } from 'constants/navigation/routePaths';


export const ErrorLayout = () => {
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
