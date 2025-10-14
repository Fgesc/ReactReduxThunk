import { productsResponse } from '../../mocks/response';
import { customRender } from '../../test/utils';
import { ProductCard } from './ProductCurd';
import { screen, within } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import type { Product } from '../../types/Product';

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

const mockProduct: Product = productsResponse[0];

describe('ProductCard Component', () => {
    it('Должен корректно отрисовать карточку продукта', () => {
        customRender(<ProductCard product={mockProduct} />);
        const productCard = screen.getByTestId(`product-card-${mockProduct.id}`);
        expect(productCard).toBeInTheDocument();
    });

    it('Должен корректно отрисовать изображение продукта в карточке', () => {
        customRender(<ProductCard product={mockProduct} />);
        const productCard = screen.getByTestId(`product-card-${mockProduct.id}`);
        expect(productCard).toBeInTheDocument();
        const image = within(productCard).getByTestId(`product-card-image-${mockProduct.id}`);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockProduct.image);
        expect(image).toHaveAttribute('alt', mockProduct.name);
    });

    it('Должен корректно отрисовать название продукта в карточке', () => {
        customRender(<ProductCard product={mockProduct} />);
        const productCard = screen.getByTestId(`product-card-${mockProduct.id}`);
        expect(productCard).toBeInTheDocument();
        expect(within(productCard).getByText(mockProduct.name.split(' ')[0])).toBeInTheDocument();
        expect(within(productCard).getByText('1 kg')).toBeInTheDocument();
    });

    it('Должен корректно отрисовать цену продукта в карточке', () => {
        customRender(<ProductCard product={mockProduct} />);
        const productCard = screen.getByTestId(`product-card-${mockProduct.id}`);
        expect(productCard).toBeInTheDocument();
        expect(within(productCard).getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    });

    it('Должен корректно отрисовать начальное количество продукта в карточке', () => {
        customRender(<ProductCard product={mockProduct} />);
        const productCard = screen.getByTestId(`product-card-${mockProduct.id}`);
        expect(productCard).toBeInTheDocument();
        const quantityText = within(productCard).getByTestId(`quantity-text-${mockProduct.id}`);
        expect(quantityText).toHaveTextContent('1');
    });

    it('Кнопка декремента в карточке продукта должна быть disabled, если количество товара 1 ', () => {
        customRender(<ProductCard product={mockProduct} />);
        const productCard = screen.getByTestId(`product-card-${mockProduct.id}`);
        expect(productCard).toBeInTheDocument();
        const decrementButton = within(productCard).getByTestId(
            `decrement-button-${mockProduct.id}`
        );
        expect(decrementButton).toBeDisabled();
    });

    it('Должна корректно отобразиться кнопка, добавляющаю продукт в корзину', () => {
        customRender(<ProductCard product={mockProduct} />);
        const productCard = screen.getByTestId(`product-card-${mockProduct.id}`);
        expect(productCard).toBeInTheDocument();
        const addToCardButton = within(productCard).getByTestId(
            `add-to-card-button-${mockProduct.id}`
        );
        expect(addToCardButton).toBeInTheDocument();
        expect(addToCardButton).toHaveTextContent(/Add to card/i);
    });
});
