export {
  getEmailFromToken,
  getEmailRoleFromToken,
} from './emailFromTokenHandler';

export {
  setAuthData,
  setEmployeeAuthData,
  removeAuthData,
  removeEmployeeAuthData,
  getAuthStatus,
  getEmail,
  getEmployeeAuthStatus,
  getEmployeeEmail,
  getEmployeeRole,
} from './storageAuthHandler';

export {
  localTokenHandler,
  sessionTokenHandler,
  clearAllTokens,
  getTokenValues,
  prepareAuthHeaders,
} from './tokenHandler';
