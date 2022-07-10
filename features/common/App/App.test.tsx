import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import localforage from 'localforage';
import { createAppStore } from '../store';

describe('App', () => {
  const loginPageRole = 'login-page';
  const mainPageRole = 'main-page';
  const userNameInputRole = 'login-page-user-name-input';
  const loginButtonRole = 'login-page-submit-button';
  const userNameRole = 'main-page-user-name';
  const logoutButtonRole = 'main-page-logout-button';
  const user = userEvent.setup();
  const testUserName = 'Test User';

  const customRender = () => {
    const store = createAppStore();
    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  beforeEach(() => {
    customRender();
  });

  afterEach(async () => {
    await localforage.clear();
  });

  test('show login page on initial render', () => {
    expect(screen.getByRole(loginPageRole)).toBeInTheDocument();
    expect(screen.getByRole(userNameInputRole)).toBeInTheDocument();
    expect(screen.getByRole(loginButtonRole)).toBeInTheDocument();
    expect(screen.queryByRole(mainPageRole)).toBeNull();
  });

  test('login, then show main page', async () => {
    const input = screen.getByRole(userNameInputRole);
    await user.type(input, testUserName);
    await user.click(screen.getByRole(loginButtonRole));

    expect(screen.getByRole(mainPageRole)).toBeInTheDocument();
    expect(screen.getByRole(userNameRole)).toHaveTextContent(testUserName);
  });

  test('login, logout, then show main page', async () => {
    // login
    const input = screen.getByRole(userNameInputRole);
    await user.type(input, testUserName);
    await user.click(screen.getByRole(loginButtonRole));
    // logout
    await user.click(screen.getByRole(logoutButtonRole));

    expect(screen.queryByRole(mainPageRole)).toBeNull();
    expect(screen.getByRole(loginPageRole)).toBeInTheDocument();
  });
});
