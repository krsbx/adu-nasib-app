import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';
import reduxStore from '../store';
import '../styles/global.scss';
import customTheme from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={reduxStore}>
      <ChakraProvider theme={customTheme}>
        <Head>
          <title>Adu Nasib</title>
        </Head>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default MyApp;
