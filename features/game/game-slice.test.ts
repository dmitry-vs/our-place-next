import {
  TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  TicTacToeCellValues,
  TicTacToeFieldValues,
  TicTacToeGameResults,
  TicTacToeGameStatuses,
  TicTacToeGameSymbols,
} from './consts';
import {
  clear,
  GAME_INITIAL_STATE,
  gameReducer,
  setCellSize,
  setFieldValues,
  setPlayerSymbol,
  setRandomFill,
  start,
  stop,
} from './game-slice';
import { logout } from '../auth/auth-slice';

describe('gameReducer', () => {
  describe('setPlayerSymbol action', () => {
    test('sets correct `playerSymbol` value', () => {
      const newSymbol = TicTacToeGameSymbols.Circle;
      const newState = gameReducer(undefined, setPlayerSymbol(newSymbol));

      expect(newState.playerSymbol).toBe(newSymbol);
    });
  });

  describe('setCellSize action', () => {
    test('sets correct `cellSize` value', () => {
      const newCellSize = '100';
      const newState = gameReducer(undefined, setCellSize(newCellSize));

      expect(newState.cellSize).toBe(newCellSize);
    });
  });

  describe('setRandomFill action', () => {
    test('sets correct `randomFill` params', () => {
      const newRandomFill = { enabled: true, value: '75' };
      const newState = gameReducer(undefined, setRandomFill(newRandomFill));

      expect(newState.randomFill).toEqual(newRandomFill);
    });
  });

  describe('setFieldValues action', () => {
    test('sets correct field values when game is not over', () => {
      const newValues: TicTacToeFieldValues = [
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
      ];
      const newState = gameReducer(undefined, setFieldValues(newValues));

      const { fieldValues, status, result } = newState;
      expect(fieldValues).toEqual(newValues);
      expect(status).toBe(GAME_INITIAL_STATE.status);
      expect(result).toBe(GAME_INITIAL_STATE.result);
    });

    test('end game correctly when cross wins', () => {
      const crossWinValues: TicTacToeFieldValues = [
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ];
      const newState = gameReducer(undefined, setFieldValues(crossWinValues));

      const { fieldValues, status, result } = newState;
      expect(fieldValues).toEqual(crossWinValues);
      expect(status).toBe(TicTacToeGameStatuses.Stopped);
      expect(result).toBe(TicTacToeGameResults.CrossWon);
    });

    test('end game correctly when circle wins', () => {
      const circleWinValues: TicTacToeFieldValues = [
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
      ];
      const newState = gameReducer(undefined, setFieldValues(circleWinValues));

      const { fieldValues, status, result } = newState;
      expect(fieldValues).toEqual(circleWinValues);
      expect(status).toBe(TicTacToeGameStatuses.Stopped);
      expect(result).toBe(TicTacToeGameResults.CircleWon);
    });

    test('end game correctly when draw', () => {
      const drawValues: TicTacToeFieldValues = [
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
      ];
      const newState = gameReducer(undefined, setFieldValues(drawValues));

      const { fieldValues, status, result } = newState;
      expect(fieldValues).toEqual(drawValues);
      expect(status).toBe(TicTacToeGameStatuses.Stopped);
      expect(result).toBe(TicTacToeGameResults.Draw);
    });
  });

  describe('start action', () => {
    test('correct `status`, `result` and `fieldValues`', () => {
      const newState = gameReducer(undefined, start());

      const { status, result, fieldValues } = newState;
      expect(status).toBe(TicTacToeGameStatuses.Started);
      expect(result).toBeNull();
      expect(fieldValues).toEqual(TIC_TAC_TOE_DEFAULT_FIELD_VALUES);
    });
  });

  describe('stop action', () => {
    test('correct status', () => {
      const newState = gameReducer(
        { ...GAME_INITIAL_STATE, status: TicTacToeGameStatuses.Started },
        stop()
      );

      expect(newState.status).toBe(TicTacToeGameStatuses.Stopped);
    });
  });

  describe('clear action', () => {
    test('given state is not default, when `clear` action is passed, then state equals to default state', () => {
      const newState = gameReducer(
        {
          ...GAME_INITIAL_STATE,
          status: TicTacToeGameStatuses.Started,
          playerSymbol: TicTacToeGameSymbols.Circle,
          result: TicTacToeGameResults.Draw,
        },
        clear()
      );

      expect(newState).toBe(GAME_INITIAL_STATE);
    });
  });

  describe('logout action (extra)', () => {
    test('given state is not default, when `logout` action (extra) is passed, then state equals to default', () => {
      const newState = gameReducer(
        {
          ...GAME_INITIAL_STATE,
          status: TicTacToeGameStatuses.Started,
          playerSymbol: TicTacToeGameSymbols.Circle,
          result: TicTacToeGameResults.Draw,
        },
        logout()
      );

      expect(newState).toBe(GAME_INITIAL_STATE);
    });
  });
});
