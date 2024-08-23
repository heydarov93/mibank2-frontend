import authReducer, {
  setError,
  setVerifying,
  setVerifyingTimer,
  clearError,
  setLoading,
  setUserData,
  logoutFromApp,
} from './AuthSlice';

import { IUserInfo } from 'models/IUserInfo';

describe('AuthSlice', () => {
  const initialState = {
    isVerifying: false,
    verifyingTimer: 0,
    user: {
      firstName: '',
      lastName: '',
      email: '',
      status: '0',
      isBlocked: null,
    },
    error: null,
    loading: false,
  };

  it('should handle setError', () => {
    const error = 'An error occurred';
    const expectedState = { ...initialState, error };
    expect(authReducer(initialState, setError(error))).toEqual(expectedState);
  });

  it('should handle setVerifying', () => {
    const isVerifying = true;
    const expectedState = { ...initialState, isVerifying };
    expect(authReducer(initialState, setVerifying(isVerifying))).toEqual(
      expectedState,
    );
  });

  it('should handle setVerifyingTimer', () => {
    const verifyingTimer = 60;
    const expectedState = { ...initialState, verifyingTimer };
    expect(
      authReducer(initialState, setVerifyingTimer(verifyingTimer)),
    ).toEqual(expectedState);
  });

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'An error occurred' };
    expect(authReducer(stateWithError, clearError())).toEqual(initialState);
  });

  it('should handle setLoading', () => {
    const loading = true;
    const expectedState = { ...initialState, loading };
    expect(authReducer(initialState, setLoading(loading))).toEqual(
      expectedState,
    );
  });

  it('should handle setUserData', () => {
    const user: IUserInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      status: '1',
      isBlocked: false,
    };
    const expectedState = { ...initialState, user };
    expect(authReducer(initialState, setUserData(user))).toEqual(expectedState);
  });

  it('should handle logoutFromApp', () => {
    const stateWithUser = {
      ...initialState,
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        status: '1',
        isBlocked: false,
      },
    };
    expect(authReducer(stateWithUser, logoutFromApp())).toEqual(initialState);
  });
});
