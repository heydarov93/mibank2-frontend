import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function EmptySection({ description }: { description?: string }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });
  const sectionDescription = description || t('emptySectionDefault');

  return (
    <Typography
      data-testid="empty-section-description"
      fontFamily="inherit"
      fontSize={16}
      color="grey.400"
      fontWeight={500}
      textAlign="center"
    >
      {sectionDescription}
    </Typography>
  );
}
