import { SvgIcon, SxProps, Theme } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LogoutSVG } from 'assets/icons/Logout.svg';

interface LogoutButtonProps {
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export const LogoutButton = memo<LogoutButtonProps>(
  ({ onClick, sx, ...props }: LogoutButtonProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        sx={{ cursor: 'pointer', ...sx }}
        onClick={onClick}
        role="button"
        aria-label={t('label.logout')}
        {...props}
      >
        <LogoutSVG />;
      </SvgIcon>
    );
  },
);

LogoutButton.displayName = 'LogoutButton';
