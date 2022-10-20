import type { NextPage } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../common/themes';
import Player from '../common/components/player';
import Rival from '../common/components/rival';
import { Provider } from 'react-redux';
import { store } from '../store/main';
import Header from '../common/components/header';
import index from '../styles/index.module.css';

const Index: NextPage = () => {

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
            <div className='tw-flex tw-w-full tw-h-full tw-flex-col'>
                <Header />
                <div className='tw-flex tw-flex-1 tw-justify-center tw-p-8'>
                    <div className={`tw-flex tw-w-full ${index.container}`}>
                        <Player></Player>
                        <Rival></Rival>
                    </div>
                </div>
            </div>
            </Provider>
        </ThemeProvider>
    );
}

export default Index;
