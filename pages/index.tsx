import type { NextPage } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../common/themes';
import Player from '../common/components/player';
import { Provider } from 'react-redux';
import { store } from '../store/main';

const Home: NextPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
            <div className='tw-flex tw-w-full tw-h-full tw-flex-col'>
                <div>Header</div>
                <div className='tw-flex tw-flex-1 tw-p-8'>
                    <Player></Player>
                </div>
            </div>
            </Provider>
        </ThemeProvider>
    );
}

export default Home;
