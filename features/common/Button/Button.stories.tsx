import React from 'react';
import Button from './Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import clsx from 'clsx';
import { css } from '@emotion/css';

export default {
  component: Button,
  title: 'TicTacToe/Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Example = Template.bind({});
Example.args = {
  children: 'Simple button',
};

export const Color = Template.bind({});
Color.args = {
  children: 'Color button',
  color: 'success',
};

export const Click = Template.bind({});
Click.args = {
  children: 'Click button',
  onClick: () => alert('click'),
};

export const ClassNames = Template.bind({});
ClassNames.args = {
  children: 'Custom classes button',
  className: clsx(
    'd-block mx-auto my-5 py-4 w-50 shadow-lg',
    css`
      text-decoration: underline;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-family: monospace;
      border-radius: 40px;
    `
  ),
};
