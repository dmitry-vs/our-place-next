import React from 'react';
import TicTacToeCell from './TicTacToeCell';
import { render, screen } from '@testing-library/react';
import { TicTacToeCellValues } from '../consts';
import userEvent from '@testing-library/user-event';

describe('TicTacToeCell', () => {
  const cellRole = 'tic-tac-toe-cell';
  const imgRole = 'tic-tac-toe-cell-img';

  it('renders empty div if value is empty', () => {
    render(<TicTacToeCell value={TicTacToeCellValues.Empty} />);
    expect(screen.getByRole(cellRole)).toBeEmptyDOMElement();
  });

  it('renders cross sign if value is cross', () => {
    render(<TicTacToeCell value={TicTacToeCellValues.Cross} />);
    expect(screen.getByRole(imgRole)).toHaveAttribute('alt', 'Крестик');
  });

  it('renders circle sign if value is circle', () => {
    render(<TicTacToeCell value={TicTacToeCellValues.Circle} />);
    expect(screen.getByRole(imgRole)).toHaveAttribute('alt', 'Нолик');
  });

  it('calls handleClick function when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(
      <TicTacToeCell
        value={TicTacToeCellValues.Empty}
        handleClick={handleClick}
      />
    );

    const cell = screen.getByRole(cellRole);
    await user.click(cell);

    expect(handleClick).toHaveBeenCalled();
  });

  it('renders element with correct class', () => {
    const className = 'test-class-name';
    render(
      <TicTacToeCell value={TicTacToeCellValues.Circle} className={className} />
    );
    expect(screen.getByRole(cellRole)).toHaveClass(className);
  });
});
