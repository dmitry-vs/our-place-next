import { select, takeEvery, call, all } from 'redux-saga/effects';
import { RootState } from '../store';
import localforage from 'localforage';
import { LocalStorageKeys } from '../consts';

export default function* rootSaga() {
  yield all([localStorageSaga()]);
}

export function* localStorageSaga() {
  yield takeEvery('*', function* () {
    const state: RootState = yield select();
    yield call(
      [localforage, localforage.setItem],
      LocalStorageKeys.State,
      state
    );
  });
}
