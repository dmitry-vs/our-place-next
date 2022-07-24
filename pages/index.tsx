import type { NextPage } from 'next';
import Head from 'next/head';
import MainPage from '../features/common/MainPage';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Our place</title>
      </Head>
      <MainPage />
    </>
  );
};

export default Home;
