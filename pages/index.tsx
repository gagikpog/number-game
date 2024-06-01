import type { NextPage } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../common/themes';
import Main from '../common/components/main';
import { Provider } from 'react-redux';
import { store } from '../store/main';
// @ts-ignore
import MetaTags from 'react-meta-tags';

const Index: NextPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <MetaTags>
                    <title>Number game</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                    <link rel="mask-icon" href="/favicon.svg" />
                    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                    <link rel="apple-touch-icon" sizes="256x256" href="/favicon.png" />
                    <link rel="icon" type="image/png" sizes="256x256" href="/favicon.png" />
                </MetaTags>
                <Main />
            </Provider>
        </ThemeProvider>
    );
}

export default Index;
