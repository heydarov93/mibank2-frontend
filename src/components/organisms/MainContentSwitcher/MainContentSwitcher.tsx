import { Outlet, useSearchParams } from 'react-router-dom';

import { EmptySection } from '../Sidebar/molecules';

import { AllCardsPage } from 'pages/index';

export function MainContentSwitcher() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');

  if (view === 'cards') {
    return <AllCardsPage />;
  }

  if (view === 'deposits') return <EmptySection />;

  return <Outlet />;
}
