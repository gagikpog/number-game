import type { NextPage } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../common/themes';
import Main from '../common/components/main';
import { Provider } from 'react-redux';
import { store } from '../store/main';

const Index: NextPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Main />
            </Provider>
        </ThemeProvider>
    );
}

export default Index;
