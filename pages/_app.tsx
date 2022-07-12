import type { AppProps } from 'next/app';
import { createAppStore } from '../features/common/store';
import { Provider } from 'react-redux';
import '../styles/index.scss';
import { getStateFromLocalStorage } from '../features/common/utils';
import { useEffect, useState } from 'react';
import Navigation from '../features/common/Navigation';

function MyApp({ Component, pageProps }: AppProps) {
  const [store, setStore] = useState(createAppStore());

  useEffect(() => {
    getStateFromLocalStorage().then((state) => {
      if (state) setStore(createAppStore(state));
    });
  }, []);

  useEffect(() => {
    window.addEventListener('unhandledrejection', handlePromiseRejection);
    return () => {
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  const handlePromiseRejection = (e: PromiseRejectionEvent) => {
    console.log('Promise rejection error:', e);
  };

  return (
    <Provider store={store}>
      <Navigation />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
