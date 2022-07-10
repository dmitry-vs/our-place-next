import React, { FC, useEffect } from 'react';
import LoginPage from '../LoginPage';
import { selectUserName } from '../../auth/auth-slice';
import MainPage from '../MainPage';
import { useAppSelector } from '../store';

const App: FC = () => {
  const userName = useAppSelector(selectUserName);

  useEffect(() => {
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  const handlePromiseRejection = (e: PromiseRejectionEvent) => {
    console.log('Promise rejection error:', e);
  };

  return userName ? <MainPage /> : <LoginPage />;
};

export default App;
