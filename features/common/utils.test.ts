import { getStateFromLocalStorage, validateNumericInputValue } from './utils';
import { LocalStorageKeys, ValidationErrors } from './consts';
import { RootState } from './store';
import { GAME_INITIAL_STATE } from '../game/game-slice';
import localforage from 'localforage';

describe('validateNumericInputValue', () => {
  const testMinValue = 10;
  const testMaxValue = 90;

  test('value is empty or whitespace, then return `required` error', () => {
    expect(validateNumericInputValue({ value: '' })).toBe(
      ValidationErrors.Required
    );
    expect(validateNumericInputValue({ value: ' ' })).toBe(
      ValidationErrors.Required
    );
  });

  test('value is not numeric, then return `format` error', () => {
    expect(validateNumericInputValue({ value: 'test' })).toBe(
      ValidationErrors.NumberExpected
    );
    expect(validateNumericInputValue({ value: '1234+' })).toBe(
      ValidationErrors.NumberExpected
    );
    expect(validateNumericInputValue({ value: '1.2' })).toBe(
      ValidationErrors.NumberExpected
    );
    expect(validateNumericInputValue({ value: '-' })).toBe(
      ValidationErrors.NumberExpected
    );
  });

  test('value is out of range, then return `out of range` error', () => {
    expect(
      validateNumericInputValue({
        value: '9',
        minValue: testMinValue,
      })
    ).toBe(ValidationErrors.OutOfRange);
    expect(
      validateNumericInputValue({
        value: '91',
        maxValue: testMaxValue,
      })
    ).toBe(ValidationErrors.OutOfRange);
  });

  test('value is correct, then return null', () => {
    expect(validateNumericInputValue({ value: '0' })).toBeNull();
    expect(
      validateNumericInputValue({
        value: '10',
        minValue: testMinValue,
      })
    ).toBeNull();
    expect(
      validateNumericInputValue({
        value: '90',
        maxValue: testMaxValue,
      })
    ).toBeNull();
  });
});

describe('getStateFromLocalStorage', () => {
  test('when state is not stored then return null', async () => {
    expect(await getStateFromLocalStorage()).toBeNull();
  });

  test('when state is stored then return correct object', async () => {
    const testUserName = 'Test User';
    const testState: RootState = {
      auth: { userName: testUserName },
      game: GAME_INITIAL_STATE,
    };

    await localforage.setItem(LocalStorageKeys.State, testState);

    const actual = await getStateFromLocalStorage();
    expect(actual?.auth.userName).toBe(testUserName);
  });
});
