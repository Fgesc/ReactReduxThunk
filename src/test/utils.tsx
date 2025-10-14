import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

export function customRender(ui: React.ReactElement, options = {}) {

    const store = setupStore(); 
    
    const AllProviders = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>
            <MantineProvider>
                {children}
            </MantineProvider>
        </Provider>
    );

    return render(ui, {
        wrapper: AllProviders,
        ...options,
    });
}