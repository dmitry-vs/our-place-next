import { AUTH_INITIAL_STATE, authReducer, login, logout } from './auth-slice';

describe('authReducer', () => {
  const testUserName = 'Test User';

  describe('login action', () => {
    test('set correct user name', () => {
      const newState = authReducer(undefined, login(testUserName));

      expect(newState.userName).toBe(testUserName);
    });
  });

  describe('logout action', () => {
    test('set user name to null', () => {
      const newState = authReducer({ userName: testUserName }, logout());

      expect(newState.userName).toBeNull();
    });
  });

  test('when action is unknown then state is unchanged', () => {
    const newState = authReducer(undefined, { type: 'unknown' });

    expect(newState).toBe(AUTH_INITIAL_STATE);
  });
});
