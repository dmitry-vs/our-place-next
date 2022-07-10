import type { NextPage } from 'next';
import Head from 'next/head';
import App from '../features/common/App';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Our place</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </>
  );
};

export default Home;
