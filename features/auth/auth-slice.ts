import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../common/store';

type AuthState = {
  userName: string | null;
};

export const AUTH_INITIAL_STATE: AuthState = {
  userName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    login: (state, { payload }: PayloadAction<string>) => {
      state.userName = payload;
    },
    logout: (state) => {
      state.userName = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

const selectAuthState = (state: RootState) => state.auth;

export const selectUserName = createSelector(
  [selectAuthState],
  (authState) => authState.userName
);
