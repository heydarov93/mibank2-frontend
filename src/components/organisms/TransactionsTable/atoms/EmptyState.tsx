import {
  StyledEmptyStateContainer,
  StyledEmptyStateContent,
} from '../TransactionsTable.styled';

import { TRANSACTION_EMPTY_STATE_CONTENTS } from 'components/organisms/TransactionsTable/constants/transactionEmptyStateContents';

type EmptyStateType = 'no-matches' | 'no-transactions' | 'offline';

interface EmptyStateProps {
  type: EmptyStateType;
  customTitle?: string;
  customMessage?: string;
}

export const EmptyState = ({
  type,
  customTitle,
  customMessage,
}: EmptyStateProps) => {
  const content = TRANSACTION_EMPTY_STATE_CONTENTS[type];

  return (
    <StyledEmptyStateContainer>
      <StyledEmptyStateContent variant="body1">
        {customTitle || content.title}
      </StyledEmptyStateContent>
      <StyledEmptyStateContent variant="body2">
        {customMessage || content.message}
      </StyledEmptyStateContent>
    </StyledEmptyStateContainer>
  );
};
