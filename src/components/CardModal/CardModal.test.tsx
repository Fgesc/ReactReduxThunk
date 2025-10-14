import { customRender } from '../../test/utils';
import { CardModal } from './CardModal';
import { screen } from '@testing-library/react';
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

describe('CardModal Component', () => {
    it('Должен корректно отрисовать основные элементы корзины, при условии, что она пуста', () => {
        customRender(<CardModal isOpenModal={true} onClose={vi.fn()} />);
        expect(screen.getByTestId('card-modal')).toBeInTheDocument();
        expect(screen.getByTestId('empty-card-message')).toBeInTheDocument();
        expect(screen.getByTestId('empty-card-img')).toBeInTheDocument();
    });

    it('Не должен отображать содержимое корзины, когда isOpenModal равно false', () => {
        customRender(<CardModal isOpenModal={false} onClose={vi.fn()} />);
        expect(screen.queryByTestId('empty-card-message')).not.toBeInTheDocument();
        expect(screen.queryByTestId('empty-card-img')).not.toBeInTheDocument();
    });
});
