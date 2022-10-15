import { createTheme, ThemeProvider } from '@mui/material/styles';

const colors = {
    text: '#ddd',
    primary: '#8bff50',
    secondary: '#11cb5f'
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#8bff50',
        },
        secondary: {
            main: '#11cb5f',
        },
        text: {
            primary: colors.text,
            secondary: colors.text,
            disabled: colors.text
        }
    },
});
