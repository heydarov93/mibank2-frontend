import {
  StyledSummaryInfoItem,
  StyledSummaryInfoLabel,
  StyledSummaryInfoValue,
} from '../MyDepositsDetails.styled';

interface SummaryInfoItemProps {
  label: string;
  value: string;
}

function SummaryInfoItem({ value, label }: SummaryInfoItemProps) {
  return (
    <StyledSummaryInfoItem>
      <StyledSummaryInfoValue>{value}</StyledSummaryInfoValue>
      <StyledSummaryInfoLabel>{label}</StyledSummaryInfoLabel>
    </StyledSummaryInfoItem>
  );
}

export default SummaryInfoItem;
