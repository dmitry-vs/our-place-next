import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {
  TIC_TAC_TOE_FIELD_DEFAULT_RANDOM_FILL,
  TIC_TAC_TOE_CELL_DEFAULT_SIZE,
  TicTacToeCellValues,
  TicTacToeFieldValues,
  TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT,
} from '../consts';
import TicTacToeGame from './TicTacToeGame';
import userEvent from '@testing-library/user-event';
import { findTicTacToeEmptyCellIndex } from '../utils';
import { Provider } from 'react-redux';
import { createAppStore } from '../../common/store';
import { ValidationErrors } from '../../common/consts';

describe('TicTacToeGame', () => {
  let game: HTMLElement | null,
    field: HTMLElement | null,
    symbolSelect: HTMLSelectElement,
    symbolSelectOptions: HTMLOptionElement[],
    cellSizeInput: HTMLInputElement,
    cellSizeError: HTMLElement,
    randomFillSwitch: HTMLInputElement,
    randomFillInput: HTMLInputElement,
    randomFillError: HTMLElement,
    invalidInputAlert: HTMLElement | null,
    statusInfo: HTMLElement | null,
    playerInfo: HTMLElement | null,
    symbolInfo: HTMLElement | null,
    resultInfo: HTMLElement | null,
    cells: HTMLElement[],
    startStopButton: HTMLButtonElement;

  const user = userEvent.setup();

  const testUserName = 'Test User Name';

  beforeEach(() => {
    const store = createAppStore({ auth: { userName: testUserName } });
    render(
      <Provider store={store}>
        <TicTacToeGame />
      </Provider>
    );

    game = screen.queryByRole('tic-tac-toe-game');
    symbolSelect = screen.getByRole('tic-tac-toe-game-symbol-select');
    symbolSelectOptions = screen.queryAllByRole(
      'tic-tac-toe-game-symbol-select-option'
    );
    cellSizeInput = screen.getByRole('tic-tac-toe-game-cell-size-input');
    cellSizeError = screen.getByRole('tic-tac-toe-game-cell-size-error');
    randomFillSwitch = screen.getByRole('tic-tac-toe-game-random-fill-switch');
    randomFillInput = screen.getByRole('tic-tac-toe-game-random-fill-input');
    randomFillError = screen.getByRole('tic-tac-toe-game-random-fill-error');
    field = screen.queryByRole('tic-tac-toe-field');
    cells = screen.queryAllByRole('tic-tac-toe-cell');
    invalidInputAlert = screen.queryByRole(
      'tic-tac-toe-game-invalid-input-alert'
    );
    statusInfo = screen.queryByRole('tic-tac-toe-game-status-info');
    playerInfo = screen.queryByRole('tic-tac-toe-game-player-info');
    symbolInfo = screen.queryByRole('tic-tac-toc-game-symbol-info');
    resultInfo = screen.queryByRole('tic-tac-toe-game-result-info');
    startStopButton = screen.getByRole('tic-tac-toe-game-start-stop-button');
  });

  afterEach(() => {
    cleanup();
  });

  test('correct initial render', () => {
    expect(game).toBeInTheDocument();
    expect(symbolSelect).toBeEnabled();
    expect(symbolSelectOptions[0].selected).toBe(true);
    expect(symbolSelectOptions[1].selected).toBe(false);
    expect(cellSizeInput).toHaveValue(TIC_TAC_TOE_CELL_DEFAULT_SIZE.toString());
    expect(randomFillInput).toBeDisabled();
    expect(randomFillInput).toHaveValue(
      TIC_TAC_TOE_FIELD_DEFAULT_RANDOM_FILL.toString()
    );
    expect(field).toHaveClass('fieldInactive');
    expect(invalidInputAlert).toBeNull();
    expect(statusInfo).toHaveTextContent('???????? ???? ????????????');
    expect(playerInfo).toHaveTextContent(testUserName);
    expect(symbolInfo).toHaveTextContent('????????????????');
    expect(resultInfo).toBeNull();
    expect(startStopButton).toHaveTextContent('???????????? ????????');
  });

  test('correct behaviour on symbol change', async () => {
    expect(symbolSelect).toBeTruthy();
    await user.selectOptions(symbolSelect, symbolSelectOptions[1]);
    expect(symbolSelectOptions[0].selected).toBe(false);
    expect(symbolSelectOptions[1].selected).toBe(true);
    expect(symbolInfo).toHaveTextContent('????????????');
  });

  test('correct behaviour on start button click', async () => {
    await user.click(startStopButton);
    expect(symbolSelect).toBeDisabled();
    expect(randomFillSwitch).toBeDisabled();
    expect(randomFillInput).toBeDisabled();
    expect(field).toHaveClass('fieldActive');
    expect(statusInfo).toHaveTextContent('???????? ????????????');
    expect(resultInfo).toBeNull();
    expect(startStopButton).toHaveTextContent('?????????????????? ????????');
  });

  test('enable random fill, click start button, then random fill input is disabled', async () => {
    await user.click(randomFillSwitch);
    // ???????????? ?????????????? ?????????????????????????? 20, ?????????? ???????? ?????????? ???? ?????????????????????? ?????????? ?????????? ????????????
    await user.clear(randomFillInput);
    await user.type(randomFillInput, '20');

    await user.click(startStopButton);
    expect(randomFillInput).toBeDisabled();
  });

  test('correct behaviour on stop button click', async () => {
    await user.click(startStopButton);
    await user.click(startStopButton);
    expect(symbolSelect).toBeEnabled();
    expect(startStopButton).toHaveTextContent('???????????? ????????');
    expect(field).toHaveClass('fieldInactive');
    expect(statusInfo).toHaveTextContent('???????? ???? ????????????');
    expect(resultInfo).toBeNull();
  });

  test('correct behaviour on empty cell click', async () => {
    await user.click(startStopButton);
    await user.click(cells[0]);
    expect(cells[0].querySelector('img[alt="??????????????"]')).toBeTruthy();
    expect(
      cells.find((item) => !!item.querySelector('img[alt="??????????"]'))
    ).toBeTruthy();
  });

  test('correct behaviour on non-empty cell click', async () => {
    await user.click(startStopButton);
    await user.click(cells[4]);
    await user.click(cells[4]);
    expect(cells[4].querySelector(`img[alt="??????????????"]`)).toBeTruthy();
    expect(
      cells.find((item) => !!item.querySelector('img[alt="??????????"]'))
    ).toBeTruthy();
  });

  test('correct behaviour if user plays game to end', async () => {
    await user.click(startStopButton);

    const makeUserTurn = async () => {
      const currentFieldValues = cells.map((item) => {
        const img = item.querySelector('img');
        if (!img) return TicTacToeCellValues.Empty;
        const alt = img.getAttribute('alt');
        return alt === '??????????????'
          ? TicTacToeCellValues.Cross
          : TicTacToeCellValues.Circle;
      }) as TicTacToeFieldValues;
      const emptyCellIndex = findTicTacToeEmptyCellIndex(currentFieldValues);
      if (emptyCellIndex !== null) await user.click(cells[emptyCellIndex]);
    };

    // 5 ?????????? ???????????? ???????????????????? ?????? ???????????????????? ????????
    for (let i = 0; i < 5; i++) await makeUserTurn();

    expect(symbolSelect).toBeEnabled();
    expect(startStopButton).toHaveTextContent('???????????? ????????');
    expect(field).toHaveClass('fieldInactive');
    expect(statusInfo).toHaveTextContent('???????? ????????????????');
    resultInfo = screen.getByRole('tic-tac-toe-game-result-info');
    expect(resultInfo).toBeTruthy();
    expect(
      ['???????????????????????? ??????????????', '???????????????????????? ????????????????', '??????????'].includes(
        (resultInfo as HTMLElement).textContent as string
      )
    ).toBe(true);
  });

  test('show game field when cell size value is valid', async () => {
    await user.clear(cellSizeInput);
    await user.type(cellSizeInput, '100');
    expect(field).toBeTruthy();
    expect(invalidInputAlert).toBeNull();
  });

  test('input invalid cell size, then render correct error message and alert', async () => {
    const fieldRole = 'tic-tac-toe-field';
    const alertRole = 'tic-tac-toe-game-invalid-input-alert';

    // try empty value
    await user.clear(cellSizeInput);
    expect(screen.queryByRole(fieldRole)).toBeNull();
    expect(cellSizeError).toHaveTextContent(ValidationErrors.Required);
    expect(screen.getByRole(alertRole)).toHaveTextContent(
      TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT
    );

    // try value out of range
    await user.type(cellSizeInput, '200');
    expect(screen.queryByRole(fieldRole)).toBeNull();
    expect(cellSizeError).toHaveTextContent(ValidationErrors.OutOfRange);
    expect(screen.getByRole(alertRole)).toHaveTextContent(
      TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT
    );

    // try non-numeric value
    await user.clear(cellSizeInput);
    await user.type(cellSizeInput, 'test');
    expect(screen.queryByRole(fieldRole)).toBeNull();
    expect(cellSizeError).toHaveTextContent(ValidationErrors.NumberExpected);
    expect(screen.getByRole(alertRole)).toHaveTextContent(
      TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT
    );
  });

  test('input invalid random fill value, then render errors and start button disabled', async () => {
    const fieldRole = 'tic-tac-toe-field';
    const alertRole = 'tic-tac-toe-game-invalid-input-alert';
    await user.click(randomFillSwitch);

    // try empty value
    await user.clear(randomFillInput);
    expect(screen.queryByRole(fieldRole)).toBeNull();
    expect(randomFillError).toHaveTextContent(ValidationErrors.Required);
    expect(screen.getByRole(alertRole)).toHaveTextContent(
      TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT
    );
    expect(startStopButton).toBeDisabled();

    // try value out of range
    await user.type(randomFillInput, '200');
    expect(screen.queryByRole(fieldRole)).toBeNull();
    expect(randomFillError).toHaveTextContent(ValidationErrors.OutOfRange);
    expect(screen.getByRole(alertRole)).toHaveTextContent(
      TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT
    );
    expect(startStopButton).toBeDisabled();

    // try non-numeric value
    await user.clear(randomFillInput);
    await user.type(randomFillInput, 'test');
    expect(screen.queryByRole(fieldRole)).toBeNull();
    expect(randomFillError).toHaveTextContent(ValidationErrors.NumberExpected);
    expect(screen.getByRole(alertRole)).toHaveTextContent(
      TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT
    );
    expect(startStopButton).toBeDisabled();
  });
});
