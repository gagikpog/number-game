import type { NextPage } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../common/themes';
import Game from '../common/components/game';

const Home: NextPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className='tw-flex tw-w-full tw-h-full tw-flex-col'>
                <div>Header</div>
                <div className='tw-flex tw-flex-1'>
                    <Game></Game>
                    <Game></Game>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Home;
