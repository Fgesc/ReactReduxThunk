import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './components/App/App.tsx';
import { store } from './store/store';
import '@mantine/core/styles.css';
import './index.css';

const theme = createTheme({
    fontFamily: 'Inter, sans-serif',
    headings: { fontFamily: 'Inter, sans-serif' },
    colors: {
        'fresh-green': [
            '#EAFBEE',
            '#E7FAEB',
            '#D6F0DC',
            '#94D0A1',
            '#74C286',
            '#5FB974',
            '#54B46A',
            '#3B944E',
            '#388D4D',
            '#2A7A3F',
        ],
        gray: [
            '#F5F5F5',
            '#EEEEEE',
            '#E0E0E0',
            '#DEE2E6',
            '#BDBDBD',
            '#9E9E9E',
            '#757575',
            '#616161',
            '#424242',
            '#212121',
        ],
    },

    primaryColor: 'fresh-green',
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <MantineProvider theme={theme}>
                <App />
            </MantineProvider>
        </Provider>
    </StrictMode>
);
