import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIC_TAC_TOE_CELL_DEFAULT_SIZE,
  TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  TIC_TAC_TOE_FIELD_DEFAULT_RANDOM_FILL,
  TicTacToeFieldValues,
  TicTacToeGameResults,
  TicTacToeGameStatuses,
  TicTacToeGameSymbols,
} from './consts';
import { RootState } from '../../app/store';
import { logout } from '../auth/auth-slice';
import { getTicTacToeGameResult } from './utils';

type GameState = {
  status: TicTacToeGameStatuses;
  fieldValues: TicTacToeFieldValues;
  playerSymbol: TicTacToeGameSymbols;
  result: TicTacToeGameResults | null;
  cellSize: string;
  randomFill: RandomFill;
};

type RandomFill = {
  enabled: boolean;
  value: string;
};

export const GAME_INITIAL_STATE: GameState = {
  status: TicTacToeGameStatuses.Stopped,
  fieldValues: TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  playerSymbol: TicTacToeGameSymbols.Cross,
  result: null,
  cellSize: TIC_TAC_TOE_CELL_DEFAULT_SIZE.toString(),
  randomFill: {
    enabled: false,
    value: TIC_TAC_TOE_FIELD_DEFAULT_RANDOM_FILL.toString(),
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState: GAME_INITIAL_STATE,
  reducers: {
    setPlayerSymbol: (
      state,
      { payload }: PayloadAction<TicTacToeGameSymbols>
    ) => {
      state.playerSymbol = payload;
    },
    setCellSize: (state, { payload }: PayloadAction<string>) => {
      state.cellSize = payload;
    },
    setRandomFill: (state, { payload }: PayloadAction<Partial<RandomFill>>) => {
      state.randomFill = { ...state.randomFill, ...payload };
    },
    setFieldValues: (
      state,
      { payload }: PayloadAction<TicTacToeFieldValues>
    ) => {
      const result = getTicTacToeGameResult(payload);
      state.fieldValues = payload;
      state.result = result;
      if (result !== null) state.status = TicTacToeGameStatuses.Stopped;
    },
    start: (state) => {
      state.status = TicTacToeGameStatuses.Started;
      state.fieldValues = TIC_TAC_TOE_DEFAULT_FIELD_VALUES;
      state.result = null;
    },
    stop: (state) => {
      state.status = TicTacToeGameStatuses.Stopped;
    },
    clear: () => {
      return GAME_INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, () => {
      return GAME_INITIAL_STATE;
    });
  },
});

export const {
  setPlayerSymbol,
  setCellSize,
  setRandomFill,
  setFieldValues,
  clear,
  start,
  stop,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;

const selectGameState = (state: RootState) => state.game;

export const selectGameStatus = createSelector(
  [selectGameState],
  (gameState) => gameState.status
);

export const selectGameFieldValues = createSelector(
  [selectGameState],
  (gameState) => gameState.fieldValues
);

export const selectGamePlayerSymbol = createSelector(
  [selectGameState],
  (gameState) => gameState.playerSymbol
);

export const selectGameResult = createSelector(
  [selectGameState],
  (gameState) => gameState.result
);

export const selectGameCellSize = createSelector(
  [selectGameState],
  (gameState) => gameState.cellSize
);

export const selectGameRandomFillEnabled = createSelector(
  [selectGameState],
  (gameState) => gameState.randomFill.enabled
);

export const selectGameRandomFillValue = createSelector(
  [selectGameState],
  (gameState) => gameState.randomFill.value
);
