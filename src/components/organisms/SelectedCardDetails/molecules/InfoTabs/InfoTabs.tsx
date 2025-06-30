import { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';


import { StyledTab, StyledTabs } from './InfoTabs.styled';

import { ECardInfoTab } from 'enums/ECardInfoTab';

interface InfoTabsProps {
  activeTab: string;
  onTabChange: (_: SyntheticEvent, newValue: string) => void;
}

const InfoTabs = ({ activeTab, onTabChange }: InfoTabsProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'AllCards.selectedCard',
  });
  const displayOption = activeTab === ECardInfoTab.Information ? 'block' : 'none';

  return (
    <StyledTabs
      value={activeTab}
      onChange={onTabChange}
      TabIndicatorProps={{
        style: {
          display: displayOption,
        },
      }}
      data-testid="info-tabs"
      data-value={activeTab}
      data-indicator-display={displayOption}
    >
      <StyledTab
        data-testid={`tab-${ECardInfoTab.Transactions}`}
        label={t('transactionsTabLabel')}
        value={ECardInfoTab.Transactions}
        data-value={ECardInfoTab.Transactions}
        disabled
      />
      <StyledTab
        data-testid={`tab-${ECardInfoTab.Information}`}
        label={t('informationTabLabel')}
        value={ECardInfoTab.Information}
        data-value={ECardInfoTab.Information}
      />
      <StyledTab
        data-testid={`tab-${ECardInfoTab.Settings}`}
        label={t('settingsTabLabel')}
        value={ECardInfoTab.Settings}
        data-value={ECardInfoTab.Settings}
        disabled
      />
    </StyledTabs>
  );
};

export default InfoTabs;
