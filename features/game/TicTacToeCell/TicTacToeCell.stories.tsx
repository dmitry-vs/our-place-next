import React from 'react';
import TicTacToeCell from './TicTacToeCell';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TicTacToeCellValues } from '../consts';
import { css } from '@emotion/css';

export default {
  component: TicTacToeCell,
  title: 'TicTacToe/TicTacToeCell',
  decorators: [(story) => <div style={{ padding: '1rem' }}>{story()}</div>],
} as ComponentMeta<typeof TicTacToeCell>;

const Template: ComponentStory<typeof TicTacToeCell> = (args) => (
  <TicTacToeCell {...args} />
);

export const Empty = Template.bind({});
Empty.args = { value: TicTacToeCellValues.Empty };

export const Cross = Template.bind({});
Cross.args = { value: TicTacToeCellValues.Cross };

export const Circle = Template.bind({});
Circle.args = { value: TicTacToeCellValues.Circle };

export const Clickable = Template.bind({});
Clickable.args = {
  value: TicTacToeCellValues.Cross,
  handleClick: () => alert('Cell click'),
};

export const Styled = Template.bind({});
Styled.args = {
  value: TicTacToeCellValues.Circle,
  className: css`
    border: 1px solid;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  `,
};
