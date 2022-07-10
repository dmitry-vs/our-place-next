import React from 'react';
import GameScreen from './GameScreen';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createAppStore } from '../../common/store';

describe('GameScreen', () => {
  const gameScreeRole = 'game-screen';
  const ticTacToeGameRole = 'tic-tac-toe-game';
  const testUserName = 'Test User';

  test('userName is null, then renders empty element', () => {
    const store = createAppStore({ auth: { userName: null } });
    render(
      <Provider store={store}>
        <GameScreen />
      </Provider>
    );

    expect(screen.getByRole(gameScreeRole)).toBeEmptyDOMElement();
    expect(screen.queryByRole(ticTacToeGameRole)).toBeNull();
  });

  test('userName is not null, then renders game', () => {
    const store = createAppStore({ auth: { userName: testUserName } });
    render(
      <Provider store={store}>
        <GameScreen />
      </Provider>
    );

    expect(screen.getByRole(gameScreeRole)).not.toBeEmptyDOMElement();
    expect(screen.getByRole(ticTacToeGameRole)).toBeInTheDocument();
  });
});
