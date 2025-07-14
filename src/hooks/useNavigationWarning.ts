import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { TO_SIGN_IN, TO_WELCOME } from 'constants/navigation/routePaths';
import { EWelcomeTab } from 'enums';

export const useNavigationWarning = ({
  onVerifyEmail,
  redirectToSignIn = false,
}: {
  onVerifyEmail: boolean;
  redirectToSignIn?: boolean;
}) => {
  const navigate = useNavigate();
  const [warningModalOpen, setWarningModalOpen] = useState(false);

  const handleBackClick = useCallback(() => {
    if (onVerifyEmail) {
      navigate(`${TO_WELCOME}?tab=${EWelcomeTab.Business}`);
    } else {
      setWarningModalOpen(true);
    }
  }, []);

  const handleNavigateBack = useCallback(() => {
    if (redirectToSignIn) {
      navigate(TO_SIGN_IN);
    } else {
      navigate(`${TO_WELCOME}?tab=${EWelcomeTab.Business}`);
    }
    setWarningModalOpen(false);
  }, [navigate]);

  const handleCancelNavigateBack = useCallback(() => {
    setWarningModalOpen(false);
  }, []);

  return {
    warningModalOpen,
    handleBackClick,
    handleNavigateBack,
    handleCancelNavigateBack,
  };
};
