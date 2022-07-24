import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { createAppStore } from '../store';
import { APP_NAME } from '../consts';

describe('MainPage', () => {
  const user = userEvent.setup();
  const testUserName = 'TestUserName';
  let dispatchMock: jest.Mock;
  let page: HTMLElement,
    brand: HTMLElement,
    userName: HTMLElement,
    logoutButton: HTMLElement,
    content: HTMLElement;

  beforeEach(() => {
    dispatchMock = jest.fn();
    const store = createAppStore({ auth: { userName: testUserName } });
    store.dispatch = dispatchMock;
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
    page = screen.getByRole('main-page');
    brand = screen.getByRole('main-page-brand');
    userName = screen.getByRole('main-page-user-name');
    logoutButton = screen.getByRole('main-page-logout-button');
    content = screen.getByRole('main-page-content');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('correct initial render and logout button enabled', () => {
    expect(page).toBeInTheDocument();
    expect(brand).toHaveTextContent(APP_NAME);
    expect(userName).toHaveTextContent(testUserName);
    expect(logoutButton).toBeEnabled();
    expect(content).toBeInTheDocument();
  });

  test('logout callback called after click on logout button', async () => {
    await user.click(logoutButton);
    expect(dispatchMock).toBeCalledTimes(1);
  });
});
