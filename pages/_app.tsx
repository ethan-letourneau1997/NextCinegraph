import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import NextApp, { AppContext, AppProps } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import '../styles/globals.css';

import Head from 'next/head';
import { Notifications } from '@mantine/notifications';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import { Layout } from '../components/Layout/layout';

const inter = Inter({ subsets: ['latin'] });

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <div className={inter.className}>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            fontFamily: 'inter',
            colorScheme,
            globalStyles: (theme) => ({
              body: {
                ...theme.fn.fontStyles(),
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
                color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.black,
                lineHeight: theme.lineHeight,
              },
            }),
            colors: {
              brand: [
                '#FAFAFA',
                '#F4F4F5',
                '#E4E4E7',
                '#A1A1AA',
                '#A1A1AA',
                '#71717A',
                '#52525B',
                '#3F3F46',
                '#27272A',
                '#18181B',
              ],
              accent: ['#FFCA05'],
            },
            components: {
              Accordian: {
                defaultProps: {},
              },
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Notifications />
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
