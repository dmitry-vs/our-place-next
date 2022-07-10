import type { AppProps } from 'next/app';
import { createAppStore } from '../features/common/store';
import { Provider } from 'react-redux';
import '../styles/index.scss';
import { getStateFromLocalStorage } from '../features/common/utils';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [store, setStore] = useState(createAppStore());

  useEffect(() => {
    getStateFromLocalStorage().then((state) => {
      if (state) setStore(createAppStore(state));
    });
  }, []);

  return (
    <Provider store={store}>
      <title>test</title>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
