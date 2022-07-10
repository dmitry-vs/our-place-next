import React, { FC, MouseEventHandler } from 'react';
import { TicTacToeCellValues } from '../consts';
import s from './TicTacToeCell.module.scss';

type TicTacToeCellProps = {
  value: TicTacToeCellValues;
  handleClick?: MouseEventHandler;
  className?: string;
};

const TicTacToeCell: FC<TicTacToeCellProps> = ({
  handleClick,
  className,
  value,
}) => {
  const renderCellContent = () => {
    if (value === TicTacToeCellValues.Empty) return null;

    const imgParamsMapping = {
      [TicTacToeCellValues.Cross]: {
        src: '/cross.svg',
        alt: 'Крестик',
        height: 45,
        width: 45,
      },
      [TicTacToeCellValues.Circle]: {
        src: '/circle.svg',
        alt: 'Нолик',
        height: 30,
        width: 30,
      },
    };
    const { src, alt, height, width } = imgParamsMapping[value];

    return (
      <img
        role="tic-tac-toe-cell-img"
        className={s.animated}
        src={src}
        alt={alt}
        height={`${height}px`}
        width={`${width}px`}
      />
    );
  };

  return (
    <div role="tic-tac-toe-cell" onClick={handleClick} className={className}>
      {renderCellContent()}
    </div>
  );
};

export default TicTacToeCell;
