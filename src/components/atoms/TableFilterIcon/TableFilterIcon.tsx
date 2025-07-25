import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as FilterSVG } from 'assets/icons/TableFilterIcon.svg';

interface TableFilterIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const TableFilterIcon = memo<TableFilterIconProps>(
  ({ sx, ...props }: TableFilterIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 10 18"
        sx={{ height: '18px', width: '10px', ...sx }}
        role="img"
        aria-label={t('label.TableFilter')}
        {...props}
      >
        <FilterSVG />
      </SvgIcon>
    );
  },
);

TableFilterIcon.displayName = 'FilterIcon';
