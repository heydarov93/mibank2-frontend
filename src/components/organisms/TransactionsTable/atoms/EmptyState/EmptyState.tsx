import { StyledEmptyStateContainer, StyledEmptyStateContent } from '../../TransactionsTable.styled';

import { TRANSACTION_EMPTY_STATE_CONTENTS } from 'constants/business/transaction';

type TEmptyStateType = 'no-matches' | 'no-transactions' | 'offline';

interface EmptyStateProps {
  type: TEmptyStateType;
  customTitle?: string;
  customMessage?: string;
}

export const EmptyState = ({
  type,
  customTitle,
  customMessage,
}: EmptyStateProps) => {
  const content = TRANSACTION_EMPTY_STATE_CONTENTS[type];
  const title = customTitle || content.title;
  const message = customMessage || content.message;

  return (
    <StyledEmptyStateContainer role="status">
      <StyledEmptyStateContent variant="body1">{title}</StyledEmptyStateContent>
      <StyledEmptyStateContent variant="body2">
        {message}
      </StyledEmptyStateContent>
    </StyledEmptyStateContainer>
  );
};
