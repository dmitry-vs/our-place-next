import { LocalStorageKeys, ValidationErrors } from './consts';
import localforage from 'localforage';
import { RootState } from './store';

type NumericInputParams = {
  value: string;
  minValue?: number;
  maxValue?: number;
};

export const validateNumericInputValue = ({
  value,
  minValue,
  maxValue,
}: NumericInputParams) => {
  const valueTrimmed = value.trim();
  if (!valueTrimmed) return ValidationErrors.Required;
  if (!/^-?\d+$/.test(valueTrimmed)) return ValidationErrors.NumberExpected;

  const valueNum = parseInt(valueTrimmed);
  if (typeof minValue === 'number' && valueNum < minValue)
    return ValidationErrors.OutOfRange;
  if (typeof maxValue === 'number' && valueNum > maxValue)
    return ValidationErrors.OutOfRange;

  return null;
};

export const getStateFromLocalStorage = () =>
  localforage.getItem<RootState>(LocalStorageKeys.State);
