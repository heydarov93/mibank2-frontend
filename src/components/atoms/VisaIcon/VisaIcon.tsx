import { CSSProperties } from 'react';

import { ReactComponent } from 'assets/icons/Visa.svg';

interface VisaIconProps {
  style?: CSSProperties;
}

export const VisaIcon = ({ style }: VisaIconProps) => (
  <ReactComponent style={style} data-testid="card-issuer-icon" />
);
