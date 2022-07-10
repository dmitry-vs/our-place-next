import React, { FC } from 'react';
import GameScreen from '../../game/GameScreen';
import { logout, selectUserName } from '../../auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../store';
import { APP_NAME } from '../consts';

const MainPage: FC = () => {
  const userName = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(logout());

  return (
    <div role="main-page" className="h-100 d-flex flex-column">
      <header className="navbar navbar-dark bg-dark">
        <div role="main-page-brand" className="navbar-brand">
          <span className="font-monospace fw-bold ms-3">{APP_NAME}</span>
        </div>
        <div
          role="main-page-user-name"
          className="navbar-nav ms-auto text-white opacity-75"
        >
          {userName}
        </div>
        <div className="navbar-nav ms-auto">
          <div className="nav-item">
            <button
              role="main-page-logout-button"
              className="btn btn-outline-light btn-sm me-2"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>
      <main role="main-page-content" className="flex-grow-1">
        <GameScreen />
      </main>
    </div>
  );
};

export default MainPage;
