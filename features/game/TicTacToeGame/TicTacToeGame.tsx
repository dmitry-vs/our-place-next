import React, { ChangeEventHandler, FC } from 'react';
import {
  selectGameCellSize,
  selectGameFieldValues,
  selectGamePlayerSymbol,
  selectGameRandomFillEnabled,
  selectGameRandomFillValue,
  selectGameResult,
  selectGameStatus,
  setCellSize,
  setFieldValues,
  setPlayerSymbol,
  setRandomFill,
  start,
  stop,
} from '../game-slice';
import {
  TIC_TAC_TOE_CELL_MAX_SIZE,
  TIC_TAC_TOE_CELL_MIN_SIZE,
  TIC_TAC_TOE_FIELD_MAX_RANDOM_FILL,
  TIC_TAC_TOE_FIELD_MIN_RANDOM_FILL,
  TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT,
  TicTacToeCellValues,
  TicTacToeFieldValues,
  TicTacToeGameResults,
  TicTacToeGameStatuses,
  TicTacToeGameSymbols,
} from '../consts';
import {
  findTicTacToeEmptyCellIndex,
  getRandomFieldValues,
  getTicTacToeGameResult,
} from '../utils';
import { css } from '@emotion/css';
import clsx from 'clsx';
import s from './TicTacToeGame.module.scss';
import TicTacToeField from '../TicTacToeField';
import Button from '../../common/Button';
import { selectUserName } from '../../auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { validateNumericInputValue } from '../../common/utils';

type TicTacToeGameProps = {
  className?: string;
};

const enum FormFields {
  PlayerSymbol = 'player-symbol',
  CellSize = 'cell-size',
  RandomFillEnabled = 'random-fill-enabled',
  RandomFillValue = 'random-fill-value',
}

const TicTacToeGame: FC<TicTacToeGameProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectGameStatus);
  const fieldValues = useAppSelector(selectGameFieldValues);
  const playerSymbol = useAppSelector(selectGamePlayerSymbol);
  const cellSize = useAppSelector(selectGameCellSize);
  const randomFillEnabled = useAppSelector(selectGameRandomFillEnabled);
  const randomFillValue = useAppSelector(selectGameRandomFillValue);
  const result = useAppSelector(selectGameResult);
  const userName = useAppSelector(selectUserName);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.currentTarget;
    if (name === FormFields.PlayerSymbol) {
      dispatch(setPlayerSymbol(parseInt(value, 10)));
    } else if (name === FormFields.CellSize) {
      dispatch(setCellSize(value));
    } else if (name === FormFields.RandomFillEnabled) {
      dispatch(setRandomFill({ enabled: !randomFillEnabled }));
    } else if (name === FormFields.RandomFillValue) {
      dispatch(setRandomFill({ value }));
    }
  };

  const handleStartStopButtonClick = () => {
    if (status === TicTacToeGameStatuses.Started) {
      dispatch(stop());
      return;
    } else {
      dispatch(start());
      if (randomFillEnabled) {
        const fieldValues = getRandomFieldValues(parseInt(randomFillValue, 10));
        dispatch(setFieldValues(fieldValues));
      }
    }
  };

  const handleCellClick = (index: number) => {
    if (status !== TicTacToeGameStatuses.Started) return;
    const currentValue = fieldValues[index];
    if (currentValue !== TicTacToeCellValues.Empty) return;

    // player turn
    const playerTurnNewValues = [...fieldValues] as TicTacToeFieldValues;
    playerTurnNewValues[index] =
      playerSymbol === TicTacToeGameSymbols.Cross
        ? TicTacToeCellValues.Cross
        : TicTacToeCellValues.Circle;
    dispatch(setFieldValues(playerTurnNewValues));
    const playerTurnNewResult = getTicTacToeGameResult(playerTurnNewValues);
    if (playerTurnNewResult !== null) return;

    // computer turn
    const computerTurnNewValues = [
      ...playerTurnNewValues,
    ] as TicTacToeFieldValues;
    const emptyCellIndex = findTicTacToeEmptyCellIndex(computerTurnNewValues);
    if (emptyCellIndex === null) return;
    computerTurnNewValues[emptyCellIndex] =
      playerSymbol === TicTacToeGameSymbols.Cross
        ? TicTacToeCellValues.Circle
        : TicTacToeCellValues.Cross;
    dispatch(setFieldValues(computerTurnNewValues));
  };

  const renderResult = () => {
    if (result === null) return null;

    let color: string, text: string;
    if (result === TicTacToeGameResults.Draw) {
      color = 'grey';
      text = 'Ничья';
    } else {
      if (
        (result === TicTacToeGameResults.CrossWon &&
          playerSymbol === TicTacToeGameSymbols.Cross) ||
        (result === TicTacToeGameResults.CircleWon &&
          playerSymbol === TicTacToeGameSymbols.Circle)
      ) {
        color = 'green';
        text = 'Пользователь победил';
      } else {
        color = 'red';
        text = 'Пользователь проиграл';
      }
    }

    return (
      <span className={css({ color })} role="tic-tac-toe-game-result-info">
        {text}
      </span>
    );
  };

  const renderStatus = () => {
    if (status === TicTacToeGameStatuses.Started) {
      return 'начата';
    } else {
      return result !== null ? 'окончена' : 'не начата';
    }
  };

  const cellSizeError = validateNumericInputValue({
    value: cellSize,
    minValue: TIC_TAC_TOE_CELL_MIN_SIZE,
    maxValue: TIC_TAC_TOE_CELL_MAX_SIZE,
  });
  const randomFillValueError = validateNumericInputValue({
    value: randomFillValue,
    minValue: TIC_TAC_TOE_FIELD_MIN_RANDOM_FILL,
    maxValue: TIC_TAC_TOE_FIELD_MAX_RANDOM_FILL,
  });

  return (
    <div role="tic-tac-toe-game" className={clsx(s.game, className)}>
      <h1 className="h1 text-center">Игра Tic-Tac-Toe</h1>

      <h4 className="h4 mt-4">Настройки игры</h4>
      <div className="row g-2">
        <div className="col">
          <div className="form-floating">
            <select
              name={FormFields.PlayerSymbol}
              className="form-select"
              onChange={handleChange}
              value={playerSymbol}
              disabled={status !== TicTacToeGameStatuses.Stopped}
              role="tic-tac-toe-game-symbol-select"
            >
              <option
                value={TicTacToeGameSymbols.Cross}
                role="tic-tac-toe-game-symbol-select-option"
              >
                Крестики
              </option>
              <option
                value={TicTacToeGameSymbols.Circle}
                role="tic-tac-toe-game-symbol-select-option"
              >
                Нолики
              </option>
            </select>
            <label>Символ игрока</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              role="tic-tac-toe-game-cell-size-input"
              type="text"
              name={FormFields.CellSize}
              className={clsx('form-control', !!cellSizeError && 'is-invalid')}
              value={cellSize}
              onChange={handleChange}
              autoComplete="off"
            />
            <label>{`Размер ячейки, px (от ${TIC_TAC_TOE_CELL_MIN_SIZE} до ${TIC_TAC_TOE_CELL_MAX_SIZE})`}</label>
            <div
              role="tic-tac-toe-game-cell-size-error"
              className="invalid-feedback"
            >
              {cellSizeError}
            </div>
          </div>
        </div>
      </div>
      <div className="row g-2 mt-2">
        <div className="col d-flex flex-column justify-content-evenly">
          <div className="form-check form-switch">
            <input
              name={FormFields.RandomFillEnabled}
              role="tic-tac-toe-game-random-fill-switch"
              className="form-check-input"
              type="checkbox"
              checked={randomFillEnabled}
              onChange={handleChange}
              disabled={status === TicTacToeGameStatuses.Started}
              autoComplete="off"
            />
            <label className="form-check-label ms-1">
              Случайное заполнение
            </label>
          </div>
          <div className="small text-muted">(игра может сразу завершиться)</div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              role="tic-tac-toe-game-random-fill-input"
              type="text"
              name={FormFields.RandomFillValue}
              className={clsx(
                'form-control',
                !!randomFillValueError && randomFillEnabled && 'is-invalid'
              )}
              value={randomFillValue}
              onChange={handleChange}
              disabled={
                !randomFillEnabled || status === TicTacToeGameStatuses.Started
              }
            />
            <label>{`Процент заполнения (от ${TIC_TAC_TOE_FIELD_MIN_RANDOM_FILL} до ${TIC_TAC_TOE_FIELD_MAX_RANDOM_FILL})`}</label>
            <div
              role="tic-tac-toe-game-random-fill-error"
              className="invalid-feedback"
            >
              {randomFillValueError}
            </div>
          </div>
        </div>
      </div>

      {!!cellSizeError || (randomFillEnabled && !!randomFillValueError) ? (
        <div
          role="tic-tac-toe-game-invalid-input-alert"
          className="alert alert-danger my-5"
        >
          {TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT}
        </div>
      ) : (
        <TicTacToeField
          values={fieldValues}
          handleCellClick={handleCellClick}
          cellSize={Number(cellSize)}
          className={clsx(
            css`
              margin: 35px auto 0;
            `,
            status === TicTacToeGameStatuses.Started
              ? s.fieldActive
              : s.fieldInactive
          )}
        />
      )}

      <h4 className="h-4 mt-4">Состояние игры</h4>
      <table className="table table-sm table-bordered">
        <tbody>
          <tr>
            <th scope="row" className="w-50">
              Статус
            </th>
            <td role="tic-tac-toe-game-status-info">Игра {renderStatus()}</td>
          </tr>
          <tr>
            <th scope="row">Игрок</th>
            <td role="tic-tac-toe-game-player-info">
              {userName || '(имя не указано)'}
            </td>
          </tr>
          <tr>
            <th scope="row">Символ игрока</th>
            <td role="tic-tac-toc-game-symbol-info">
              {playerSymbol === TicTacToeGameSymbols.Cross
                ? 'Крестики'
                : 'Нолики'}
            </td>
          </tr>
          <tr>
            <th scope="row">Результат</th>
            <td>{renderResult()}</td>
          </tr>
        </tbody>
      </table>

      <Button
        role="tic-tac-toe-game-start-stop-button"
        color={status === TicTacToeGameStatuses.Stopped ? 'success' : 'danger'}
        disabled={randomFillEnabled && !!randomFillValueError}
        onClick={handleStartStopButtonClick}
        className={clsx(
          'd-block w-100',
          css`
            margin-top: 35px;
          `
        )}
      >
        {(function () {
          if (status === TicTacToeGameStatuses.Started) return 'Завершить игру';
          return randomFillEnabled
            ? `Начать игру (случайное заполнение)`
            : 'Начать игру';
        })()}
      </Button>
    </div>
  );
};

export default TicTacToeGame;
