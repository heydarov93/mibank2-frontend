import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledIconContainer } from './NoCardIcon.styled';

import { ReactComponent as NoCardSVG } from 'assets/icons/NoCard.svg';


interface NoCardIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const NoCardIcon = memo<NoCardIconProps>(({ sx }: NoCardIconProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Accessibility',
  });

  return (
    <StyledIconContainer sx={sx}>
      <NoCardSVG role="img" aria-label={t('label.noCard')} />
    </StyledIconContainer>
  );
});

NoCardIcon.displayName = 'NoCardIcon';
