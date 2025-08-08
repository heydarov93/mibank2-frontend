import {
  StyledInfoFieldLabel,
  StyledInfoFieldValue,
} from '../MyDepositsDetails.styled';

interface InfoFieldItemProps {
  value: string;
  label: string;
}

function InfoFieldItem({ value, label }: InfoFieldItemProps) {
  return (
    <>
      <StyledInfoFieldLabel component="span">{label}</StyledInfoFieldLabel>
      <StyledInfoFieldValue component="p">{value}</StyledInfoFieldValue>
    </>
  );
}

export default InfoFieldItem;
