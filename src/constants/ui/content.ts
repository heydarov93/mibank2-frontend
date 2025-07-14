import { ReactComponent as CHF } from 'assets/icons/ChfFlag.svg';
import { ReactComponent as EUR } from 'assets/icons/EurFlag.svg';
import { ReactComponent as GBP } from 'assets/icons/GbpFlag.svg';
import { ReactComponent as JPY } from 'assets/icons/JpyFlag.svg';
import { ReactComponent as PLN } from 'assets/icons/PlnFlag.svg';
import { ReactComponent as USD } from 'assets/icons/UsaFlag.svg';
import { EWelcomeTab } from 'enums';

export const TERMS_LINK =
  'https://data.mibank2.andersenlab.dev/Terms+of+Use.pdf';
export const POLICY_LINK =
  'https://data.mibank2.andersenlab.dev/Privacy+Policy.pdf';

export const FLAG_ICONS = {
  USD,
  EUR,
  GBP,
  CHF,
  JPY,
  PLN,
};

export const WELCOME_TABS: readonly EWelcomeTab[] = [
  EWelcomeTab.Personal,
  EWelcomeTab.Business,
  EWelcomeTab.About,
];
