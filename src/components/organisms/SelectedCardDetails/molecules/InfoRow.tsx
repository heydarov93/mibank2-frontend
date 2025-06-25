import { ContentCopy, Visibility, VisibilityOff } from '@mui/icons-material';

import {
  StyledActionIcon,
  StyledInfoLabel,
  StyledInfoRow,
  StyledInfoText,
  StyledInfoValue,
  StyledMaskedText,
} from '../SelectedCardDetails.styled';

interface InfoRowProps {
  label: string;
  value: string;
  masked?: boolean;
  onToggle?: () => void;
  showIcon?: boolean;
  onCopy?: () => void;
  status?: string;
}

const InfoRow = ({
  label,
  value,
  masked,
  onToggle,
  showIcon,
  onCopy,
  status,
}: InfoRowProps) => (
  <StyledInfoRow data-testid="info-row">
    <StyledInfoLabel data-testid="info-label">{label}</StyledInfoLabel>
    <StyledInfoValue data-testid="info-value">
      {masked ? (
        <StyledMaskedText data-testid="masked-text">{value}</StyledMaskedText>
      ) : (
        <StyledInfoText
          status={status}
          data-status={status}
          data-testid="info-text"
        >
          {value}
        </StyledInfoText>
      )}
      {onToggle && (
        <StyledActionIcon onClick={onToggle} data-testid="toggle-action">
          {showIcon ? <Visibility data-testid="visibility-icon"/> : <VisibilityOff data-testid="visibility-off-icon"/>}
        </StyledActionIcon>
      )}
      {onCopy && (
        <StyledActionIcon onClick={onCopy} data-testid="copy-action">
          <ContentCopy data-testid="copy-icon"/>
        </StyledActionIcon>
      )}
    </StyledInfoValue>
  </StyledInfoRow>
);

export default InfoRow;
