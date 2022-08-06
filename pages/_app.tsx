import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';
import reduxStore from '../store';
import customTheme from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={reduxStore}>
      <ChakraProvider theme={customTheme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default MyApp;
