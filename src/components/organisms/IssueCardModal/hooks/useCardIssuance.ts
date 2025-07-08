import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import * as uuid from 'uuid';

import { CardIssueFormValues } from './useCardIssueFlow';

import {
  useCheckCardIssuanceMutation,
  useCreateUserCardAccountMutation,
  useLinkAccountWithCardMutation,
} from 'api/services/account-service/accounts.api';
import { useIssueUserCardMutation } from 'api/services/card-service/cards.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';
import { EAccount } from 'enums/EAccount';
import { IssuanceCardData } from 'models/IProductInfo';

interface CardIssuanceParams {
  selectedCard: IssuanceCardData | null;
}

interface CardIssuanceState {
  isCardIssued: boolean;
  isIssuingCard: boolean;
  errorMessage: string;
}

const defaultCardIssuanceState: CardIssuanceState = {
  isCardIssued: false,
  isIssuingCard: false,
  errorMessage: '',
};

export const useCardIssuance = ({ selectedCard }: CardIssuanceParams) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const { data: userIdData } = useGetUserIdQuery();
  const [{ isCardIssued, isIssuingCard, errorMessage }, setCardIssuanceState] =
    useReducer(
      (state: CardIssuanceState, action: Partial<CardIssuanceState>) => ({
        ...state,
        ...action,
      }),
      defaultCardIssuanceState,
    );

  const [linkAccountWithCard] = useLinkAccountWithCardMutation();
  const [checkCardIssuance] = useCheckCardIssuanceMutation();
  const [createUserCardAccount] = useCreateUserCardAccountMutation();
  const [issueUserCard] = useIssueUserCardMutation();

  async function issueCard(data: CardIssueFormValues) {
    if (!selectedCard || !userIdData) return;

    setCardIssuanceState({ isIssuingCard: true });

    const { userId } = userIdData;
    const isNewAccountSelected = data.issuanceAccount === EAccount.NEW_ACCOUNT;
    const issuanceFee = selectedCard.issueFee ?? 0;
    const isFreeCard = issuanceFee === 0;
    let isEligible = isFreeCard;
    let issuanceAccount = data.issuanceAccount;

    try {
      if (!isFreeCard) {
        await checkCardIssuance({
          paymentAccount: data.paymentAccount,
          issuanceCurrency: selectedCard.issueCurrency,
          issuanceAmount: issuanceFee,
        })
          .unwrap()
          .then(() => {
            isEligible = true;
          })
          .catch(() => {
            isEligible = false;
            setCardIssuanceState({ errorMessage: t('insufficientFunds') });
          });
      }

      if (!isEligible) {
        setCardIssuanceState({ isIssuingCard: false });
        return;
      }

      if (isNewAccountSelected) {
        const accountData = await createUserCardAccount({
          userId,
          cardId: selectedCard.cardId,
          currencyCode: selectedCard.cardCurrency,
        }).unwrap();

        issuanceAccount = accountData.userAccountId;
      } else {
        await linkAccountWithCard({
          accountId: data.issuanceAccount,
          cardId: selectedCard.cardId,
          currencyCode: selectedCard.cardCurrency,
        }).unwrap();
      }

      await issueUserCard({
        idempotencyKey: uuid.v4(),
        cardId: selectedCard.cardId,
        userId,
        paymentAccount: data.paymentAccount,
        linkedAccount: issuanceAccount,
        issuanceFee,
        issuanceFeeCurrency: selectedCard.issueCurrency,
      }).unwrap();

      setCardIssuanceState({ isCardIssued: true });
    } catch (err) {
      setCardIssuanceState({ errorMessage: t('otherError') });
    } finally {
      setCardIssuanceState({ isIssuingCard: false });
    }
  }

  function reset() {
    setCardIssuanceState(defaultCardIssuanceState);
  }

  return { issueCard, reset, isIssuingCard, errorMessage, isCardIssued };
};
