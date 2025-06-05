import { useTranslation } from "react-i18next";

const { t } = useTranslation('translation', {
  keyPrefix: 'TransactionsHistoryPage.emptyStatesContent',
});

export const TRANSACTION_EMPTY_STATE_CONTENTS = {
  'no-matches': {
    title: t("noMatches.title"),
    message: t("noMatches.message"),
  },
  'no-transactions': {
    title: t("noTransactions.title"),
    message: t("noTransactions.message"),
  },
  offline: {
    title: t("offline.title"),
    message: t("offline.message"),
  },
};
