import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as FilterSVG } from 'assets/icons/FilterIcon.svg';

interface FilterIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const FilterIcon = memo<FilterIconProps>(
  ({ sx, ...props }: FilterIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon sx={sx} role="img" aria-label={t('label.filter')} {...props}>
        <FilterSVG fill="currentColor" />;
      </SvgIcon>
    );
  },
);

FilterIcon.displayName = 'FilterIcon';
