import { CSSProperties } from 'react';

import { ReactComponent } from 'assets/icons/Mastercard.svg';

interface MastercardIconProps {
  style?: CSSProperties;
}

export const MastercardIcon = ({ style }: MastercardIconProps) => (
  <ReactComponent style={style} data-testid="card-issuer-icon" />
);
