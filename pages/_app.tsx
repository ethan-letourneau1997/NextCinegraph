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
        <title>Cinegraph</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            fontFamily: inter.style.fontFamily,
            colorScheme,
            globalStyles: (theme) => ({
              body: {
                ...theme.fn.fontStyles(),
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.black,
                lineHeight: theme.lineHeight,
              },
            }),
            colors: {},
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
