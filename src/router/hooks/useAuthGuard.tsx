import { Navigate } from 'react-router-dom';

interface UseAuthGuardProps {
  authCheck: () => boolean;
  redirectTo: string;
}

export const useAuthGuard = ({ authCheck, redirectTo }: UseAuthGuardProps) => {
  const isAuthenticated = authCheck();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return null;
};
