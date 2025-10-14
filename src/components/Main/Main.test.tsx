import { productsResponse } from '../../mocks/response';
import { customRender } from '../../test/utils';
import { Main } from './Main';
import { screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';

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

describe('Main Component', () => {
    it('Должен отрисовать сетку с правильным количеством карточек продуктов, когда список не пуст', () => {
        const testProducts = [productsResponse[0], productsResponse[1], productsResponse[2]];
        const expectedLength = testProducts.length;
        customRender(<Main products={testProducts} />);

        expect(screen.getByTestId('main-content')).toBeInTheDocument();

        const grid = screen.getByTestId('products-grid');
        expect(grid).toBeInTheDocument();

        const productCards = screen.getAllByTestId(/^product-card-\d+$/);
        expect(productCards).toHaveLength(expectedLength);

        testProducts.forEach(product => {
            const productCard = screen.getByTestId(`product-card-${product.id}`);
            expect(productCard).toBeInTheDocument();
        });
    });

    it('Должен отрисовать все 10 карточек продуктов, когда передан полный список', () => {
        const allProducts = productsResponse;
        const expectedLength = allProducts.length;

        customRender(<Main products={allProducts} />);

        expect(screen.getByTestId('main-content')).toBeInTheDocument();

        const grid = screen.getByTestId('products-grid');
        expect(grid).toBeInTheDocument();

        const productCards = screen.getAllByTestId(/^product-card-\d+$/);
        expect(productCards).toHaveLength(expectedLength);

        const firstProduct = allProducts[0];
        const lastProduct = allProducts[allProducts.length - 1];

        expect(screen.getByTestId(`product-card-${firstProduct.id}`)).toBeInTheDocument();
        expect(screen.getByTestId(`product-card-${lastProduct.id}`)).toBeInTheDocument();
    });
});
