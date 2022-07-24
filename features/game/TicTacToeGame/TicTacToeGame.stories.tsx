import React from 'react';
import TicTacToeGame from './TicTacToeGame';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { createAppStore } from '../../common/store';

export default {
  component: TicTacToeGame,
  title: 'TicTacToe/TicTacToeGame',
} as ComponentMeta<typeof TicTacToeGame>;

export const Example: ComponentStory<typeof TicTacToeGame> = (args) => {
  const store = createAppStore({ auth: { userName: 'Test User' } });
  return (
    <Provider store={store}>
      <main className="container d-flex justify-content-center pt-3 pb-5">
        <TicTacToeGame {...args} />
      </main>
    </Provider>
  );
};
