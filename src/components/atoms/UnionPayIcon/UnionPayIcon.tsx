import { CSSProperties } from 'react';

import { ReactComponent } from 'assets/icons/UnionPay.svg';

interface UnionPayIconProps {
  style?: CSSProperties;
}

export const UnionPayIcon = ({ style }: UnionPayIconProps) => (
  <ReactComponent style={style} data-testid="card-issuer-icon" />
);
