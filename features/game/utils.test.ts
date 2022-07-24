import { getTicTacToeGameResult } from './utils';
import {
  TicTacToeCellValues,
  TicTacToeFieldValues,
  TicTacToeGameResults,
} from './consts';

describe('getTicTacToeGameResult', () => {
  test.each<{ fieldValues: TicTacToeFieldValues }>([
    {
      fieldValues: [
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ],
    },
    {
      fieldValues: [
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ],
    },
    {
      fieldValues: [
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
      ],
    },
  ])(
    'when there are three symbols in a row, then symbol wins',
    ({ fieldValues }) => {
      expect(getTicTacToeGameResult(fieldValues)).toBe(
        TicTacToeGameResults.CrossWon
      );
    }
  );

  test.each<{ fieldValues: TicTacToeFieldValues }>([
    {
      fieldValues: [
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ],
    },
    {
      fieldValues: [
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
      ],
    },
    {
      fieldValues: [
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
      ],
    },
  ])(
    'when there are three symbols in a column, then symbol wins',
    ({ fieldValues }) => {
      expect(getTicTacToeGameResult(fieldValues)).toBe(
        TicTacToeGameResults.CrossWon
      );
    }
  );

  test.each<{ fieldValues: TicTacToeFieldValues }>([
    {
      fieldValues: [
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
      ],
    },
    {
      fieldValues: [
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ],
    },
  ])(
    'when there are three symbols in a diagonal, then symbol wins',
    ({ fieldValues }) => {
      expect(getTicTacToeGameResult(fieldValues)).toBe(
        TicTacToeGameResults.CrossWon
      );
    }
  );

  test('correct result in case of a draw', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
      ])
    ).toBe(TicTacToeGameResults.Draw);
  });

  test('when game is not over, result is null', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ])
    ).toBeNull();
  });
});
