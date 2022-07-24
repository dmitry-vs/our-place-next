import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  const user = userEvent.setup();
  const buttonText = 'Button';
  const buttonRole = 'test-button';

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  test('correct initial render', () => {
    render(<Button role={buttonRole}>{buttonText}</Button>);
    expect(screen.getByRole(buttonRole)).toHaveTextContent(buttonText);
  });

  test('button can be clicked', async () => {
    const clickHandlerMock = jest.fn();
    render(
      <Button role={buttonRole} onClick={clickHandlerMock}>
        {buttonText}
      </Button>
    );

    await user.click(screen.getByRole(buttonRole));

    expect(clickHandlerMock).toHaveBeenCalledTimes(1);
  });
});
