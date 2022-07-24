import { expectSaga } from 'redux-saga-test-plan';
import { createAppReducer } from '../store';
import { login } from '../../auth/auth-slice';
import { localStorageSaga } from './sagas';
import localforage from 'localforage';
import { getStateFromLocalStorage } from '../utils';

describe('localStorageSaga', () => {
  const reducer = createAppReducer();
  const testUserName = 'Test User Name';

  afterEach(async () => {
    await localforage.clear();
  });

  test('when action is dispatched, then saga saves state to local storage correctly', async () => {
    await expectSaga(localStorageSaga)
      .withReducer(reducer)
      .dispatch(login(testUserName))
      .silentRun();

    const savedState = await getStateFromLocalStorage();
    expect(savedState?.auth.userName).toBe(testUserName);
  });

  test('when action is not dispatched, then state is not saved to local storage', async () => {
    await expectSaga(localStorageSaga).withReducer(reducer).silentRun();

    const savedState = await getStateFromLocalStorage();
    expect(savedState).toBeNull();
  });
});
