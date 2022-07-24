import React from 'react';
import TicTacToeField from './TicTacToeField';
import { render, screen } from '@testing-library/react';
import {
  TIC_TAC_TOE_FIELD_SIZE,
  TicTacToeCellValues,
  TicTacToeFieldValues,
} from '../consts';

describe('TicTacToeField', () => {
  const values: TicTacToeFieldValues = [
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Cross,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Circle,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Cross,
  ];

  const handleCellClick = () => {};

  it('renders correct number of cells', () => {
    render(
      <TicTacToeField values={values} handleCellClick={handleCellClick} />
    );
    expect(screen.getAllByRole('tic-tac-toe-cell').length).toBe(
      TIC_TAC_TOE_FIELD_SIZE ** 2
    );
  });

  it('renders correct cell values', () => {
    render(
      <TicTacToeField values={values} handleCellClick={handleCellClick} />
    );
    const cells = screen.getAllByRole('tic-tac-toe-cell');
    cells.forEach((item, index) => {
      const cellValue = values[index];
      const cellImg = item.querySelector('img');
      if (cellValue === TicTacToeCellValues.Empty) {
        expect(cellImg).toBeNull();
      } else {
        const alt = cellImg?.getAttribute('alt');
        expect(alt).toEqual(
          cellValue === TicTacToeCellValues.Cross ? 'Крестик' : 'Нолик'
        );
      }
    });
  });
});
