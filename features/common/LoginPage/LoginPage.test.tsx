import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import { Provider } from 'react-redux';
import { createAppStore } from '../store';
import { APP_NAME } from '../consts';

describe('LoginPage', () => {
  const user = userEvent.setup();
  const testUserName = 'TestUserName';
  let dispatchMock: jest.Mock;
  let page: HTMLElement,
    heading: HTMLElement,
    userNameInput: HTMLElement,
    loginButton: HTMLElement;

  beforeEach(() => {
    dispatchMock = jest.fn();
    const store = createAppStore();
    store.dispatch = dispatchMock;
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    page = screen.getByRole('login-page');
    heading = screen.getByRole('login-page-heading');
    userNameInput = screen.getByRole('login-page-user-name-input');
    loginButton = screen.getByRole('login-page-submit-button');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('correct initial render with button disabled', () => {
    expect(page).toBeInTheDocument();
    expect(heading).toHaveTextContent(APP_NAME);
    expect(userNameInput).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  test('input whitespace then button still disabled', async () => {
    await user.type(userNameInput, ' ');
    expect(loginButton).toBeDisabled();
  });

  test('input whitespace and click button then callback not called', async () => {
    await user.type(userNameInput, ' ');
    await user.click(loginButton);
    expect(dispatchMock).not.toBeCalled();
  });

  test('input whitespace and press enter then callback not called', async () => {
    await user.type(userNameInput, ' {enter}');
    expect(dispatchMock).not.toBeCalled();
  });

  test('input non-whitespace then button gets enabled', async () => {
    await user.type(userNameInput, testUserName);
    expect(loginButton).toBeEnabled();
  });

  test('input non-whitespace and click button then callback called', async () => {
    await user.type(userNameInput, testUserName);
    await user.click(loginButton);
    expect(dispatchMock).toBeCalledTimes(1);
  });

  test('input non-whitespace and press enter then callback called', async () => {
    await user.type(userNameInput, `${testUserName}{enter}`);
    expect(dispatchMock).toBeCalledTimes(1);
  });
});
