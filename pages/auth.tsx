import { NextPage } from 'next';
import Head from 'next/head';
import LoginPage from '../features/common/LoginPage';

const Auth: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </>
  );
};

export default Auth;
