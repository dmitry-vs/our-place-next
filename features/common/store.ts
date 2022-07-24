import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';
import { authReducer } from '../auth/auth-slice';
import { gameReducer } from '../game/game-slice';

export const createAppReducer = () =>
  combineReducers({
    auth: authReducer,
    game: gameReducer,
  });

const reducer = createAppReducer();
export type RootState = ReturnType<typeof reducer>;

export const createAppStore = (initialState?: Partial<RootState>) => {
  const sagaMiddleWare = createSagaMiddleware();
  const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleWare),
    devTools: process.env.NODE_ENV !== 'production',
  });
  sagaMiddleWare.run(rootSaga);
  return store;
};

export type AppDispatch = ReturnType<typeof createAppStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
