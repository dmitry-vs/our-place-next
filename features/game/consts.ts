export const enum TicTacToeCellValues {
  Empty,
  Cross,
  Circle,
}

export const TIC_TAC_TOE_FIELD_SIZE = 3;

export type TicTacToeFieldValues = [
  TicTacToeCellValues,
  TicTacToeCellValues,
  TicTacToeCellValues,
  TicTacToeCellValues,
  TicTacToeCellValues,
  TicTacToeCellValues,
  TicTacToeCellValues,
  TicTacToeCellValues,
  TicTacToeCellValues
];

export const TIC_TAC_TOE_DEFAULT_FIELD_VALUES = Array(
  TIC_TAC_TOE_FIELD_SIZE ** 2
).fill(TicTacToeCellValues.Empty) as TicTacToeFieldValues;

export const enum TicTacToeGameStatuses {
  Started,
  Stopped,
}

export const enum TicTacToeGameResults {
  CrossWon,
  CircleWon,
  Draw,
}

export const enum TicTacToeGameSymbols {
  Cross,
  Circle,
}

export const TIC_TAC_TOE_CELL_DEFAULT_SIZE = 70;
export const TIC_TAC_TOE_CELL_MIN_SIZE = 50;
export const TIC_TAC_TOE_CELL_MAX_SIZE = 150;

export const TIC_TAC_TOE_FIELD_DEFAULT_RANDOM_FILL = 50;
export const TIC_TAC_TOE_FIELD_MIN_RANDOM_FILL = 1;
export const TIC_TAC_TOE_FIELD_MAX_RANDOM_FILL = 100;

export const TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT =
  'Необходимо задать корректные параметры';
