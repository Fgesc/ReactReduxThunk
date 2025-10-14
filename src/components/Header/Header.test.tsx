import { customRender } from '../../test/utils';
import { Header } from './Header';
import { screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
});

describe('Header Component', () => {
    it('Должен корректно отрисовать основные элементы Header', () => {
        customRender(<Header isOpenModal={false} setIsOpenModal={vi.fn()} />);
        expect(screen.getByTestId('header-logo')).toBeInTheDocument();
        expect(screen.getByTestId('toggle-modal-button')).toBeInTheDocument();
        screen.debug();
    });

    it('Должен отображать логотип с текстом "Vegetable" и "SHOP"', () => {
        customRender(<Header isOpenModal={false} setIsOpenModal={vi.fn()} />);
        expect(screen.getByTestId('header-logo')).toBeInTheDocument();
        expect(screen.getByText(/Vegetable/i)).toBeInTheDocument();
        expect(screen.getByText(/SHOP/i)).toBeInTheDocument();
    });

    it('Должен отображать кнопку для открытия модального окна с текстом "Card" и иконкой', () => {
        customRender(<Header isOpenModal={false} setIsOpenModal={vi.fn()} />);
        const toggleButton = screen.getByTestId('toggle-modal-button');
        expect(toggleButton).toBeInTheDocument();
        expect(toggleButton).toHaveTextContent(/Card/i);
        expect(within(toggleButton).getByRole('img')).toBeInTheDocument();
    });
});
