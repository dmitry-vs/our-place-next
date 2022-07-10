import React, { FC } from 'react';
import {
  TIC_TAC_TOE_CELL_DEFAULT_SIZE,
  TIC_TAC_TOE_FIELD_SIZE,
  TicTacToeFieldValues,
} from '../consts';
import TicTacToeCell from '../TicTacToeCell';
import s from './TicTacToeField.module.scss';
import clsx from 'clsx';
import { css } from '@emotion/css';

type TicTacToeFieldProps = {
  values: TicTacToeFieldValues;
  handleCellClick: (index: number) => void;
  cellSize?: number;
  className?: string;
};

const TicTacToeField: FC<TicTacToeFieldProps> = ({
  values,
  handleCellClick,
  cellSize = TIC_TAC_TOE_CELL_DEFAULT_SIZE,
  className,
}) => {
  return (
    <div
      role="tic-tac-toe-field"
      className={clsx(
        s.field,
        css`
          width: ${TIC_TAC_TOE_FIELD_SIZE * cellSize}px;
          grid-template-rows: repeat(${TIC_TAC_TOE_FIELD_SIZE}, 1fr);
          grid-template-columns: repeat(${TIC_TAC_TOE_FIELD_SIZE}, 1fr);
        `,
        className
      )}
    >
      {values.map((item, index) => (
        <TicTacToeCell
          key={index}
          value={item}
          className={clsx(
            s.cell,
            css`
              height: ${cellSize}px;
            `
          )}
          handleClick={() => handleCellClick(index)}
        />
      ))}
    </div>
  );
};

export default TicTacToeField;
