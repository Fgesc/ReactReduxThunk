import { customRender } from '../../test/utils';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { server } from '../../mocks/server';
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';

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

describe('App Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('Должен отрендерить компонент App', () => {
        customRender(<App />);
        expect(screen.getByText(/Vegetable/i)).toBeInTheDocument();
        expect(screen.getByText(/SHOP/i)).toBeInTheDocument();
    });

    it('Должно сначала открыть пустое модальное окно при нажатии кнопки, которая открывает корзину, затем закрыть', async () => {
        const user = userEvent.setup();
        customRender(<App />);
        expect(screen.queryByTestId('empty-card-message')).not.toBeInTheDocument();
        const toggleModalButton = screen.getByTestId('toggle-modal-button');
        await user.click(toggleModalButton);
        const emptyMessage = await screen.findByTestId('empty-card-message');
        expect(emptyMessage).toBeInTheDocument();
        await user.click(toggleModalButton);
        await waitFor(() => {
            expect(screen.queryByTestId('empty-card-message')).not.toBeInTheDocument();
        });
    });

    it('Должно корректно регулировать количество товароа, который пользователь хочет добавить в корзину', async () => {
        const user = userEvent.setup();
        customRender(<App />);
        const brocolliCard = await screen.findByTestId('product-card-1');

        const { getByTestId } = within(brocolliCard);

        const decrementButton = getByTestId('decrement-button-1');
        const quantityText = getByTestId('quantity-text-1');
        const incrementButton = getByTestId('increment-button-1');

        expect(quantityText).toHaveTextContent('1');

        await user.click(incrementButton);
        expect(await within(brocolliCard).findByText('2')).toBeInTheDocument();

        await user.click(decrementButton);
        expect(await within(brocolliCard).findByText('1')).toBeInTheDocument();
    });

    it('Должно корректно регулировать количество товароа, при количестве товара 1, кнопка декремент дизаблится', async () => {
        const user = userEvent.setup();
        customRender(<App />);
        const brocolliCard = await screen.findByTestId('product-card-1');
        const { getByTestId } = within(brocolliCard);

        const decrementButton = getByTestId('decrement-button-1');
        const quantityText = getByTestId('quantity-text-1');

        expect(quantityText).toHaveTextContent('1');

        expect(decrementButton).toBeDisabled();

        await user.click(decrementButton);
        expect(quantityText).toHaveTextContent('1');
        expect(decrementButton).toBeDisabled();
    });

    it('Должно корректно регулировать количество товароа, при количестве товара 10, кнопка инкремент дизаблится', async () => {
        const user = userEvent.setup();
        customRender(<App />);
        const brocolliCard = await screen.findByTestId('product-card-1');
        const { getByTestId } = within(brocolliCard);

        let incrementButton = getByTestId('increment-button-1');
        const quantityText = getByTestId('quantity-text-1');

        expect(quantityText).toHaveTextContent('1');
        expect(incrementButton).not.toBeDisabled();

        for (let i = 0; i < 9; i++) {
            await user.click(incrementButton);
            await within(brocolliCard).findByText(`${i + 2}`);

            incrementButton = getByTestId('increment-button-1');
        }

        expect(incrementButton).toBeDisabled();
    });

    it('Должно корректно добавлять в корзину выбранное пользователем количество товара', async () => {
        const user = userEvent.setup();
        customRender(<App />);

        const brocolliCard = await screen.findByTestId('product-card-1');
        const { getByTestId } = within(brocolliCard);

        const incrementButton = getByTestId('increment-button-1');
        const quantityText = getByTestId('quantity-text-1');
        const addToCardButton = getByTestId('add-to-card-button-1');

        expect(quantityText).toHaveTextContent('1');

        for (let i = 0; i < 4; i++) {
            await user.click(incrementButton);

            await within(brocolliCard).findByText(`${i + 2}`);
        }

        expect(quantityText).toHaveTextContent('5');
        await user.click(addToCardButton);

        const toggleModalButton = screen.getByTestId('toggle-modal-button');
        await user.click(toggleModalButton);

        const cardItemContainer = await screen.findByTestId('card-item-1');

        const { getByTestId: getByTestIdInCard } = within(cardItemContainer);
        const cardItemQuantity = getByTestIdInCard('card-item-quantity-1');

        expect(cardItemQuantity).toHaveTextContent('5');
    });

    it('Должно корректно менять значение при изменении количества товара в корзине через кнопки инкремента и декремента', async () => {
        const user = userEvent.setup();
        customRender(<App />);

        const brocolliCard = await screen.findByTestId('product-card-1');
        const { getByTestId } = within(brocolliCard);

        const quantityText = getByTestId('quantity-text-1');
        const addToCardButton = getByTestId('add-to-card-button-1');

        expect(quantityText).toHaveTextContent('1');

        await user.click(addToCardButton);

        const toggleModalButton = screen.getByTestId('toggle-modal-button');
        await user.click(toggleModalButton);

        const cardItemContainer = await screen.findByTestId('card-item-1');

        const { getByTestId: getByTestIdInCard } = within(cardItemContainer);

        const cardItemBtnIncrement = getByTestIdInCard('card-item-increment-1');
        await user.click(cardItemBtnIncrement);

        const cardItemQuantity = getByTestIdInCard('card-item-quantity-1');
        expect(cardItemQuantity).toHaveTextContent('2');
    });

    it('Должно корректно отображать итоговую стоимость всего товара, добавленного в корзину', async () => {
        const user = userEvent.setup();
        customRender(<App />);

        const brocolliCard = await screen.findByTestId('product-card-1');
        const cucumberCard = await screen.findByTestId('product-card-3');

        const { getByTestId: getByTestIdBrocolli } = within(brocolliCard);
        const { getByTestId: getByTestIdCucumber } = within(cucumberCard);

        const addToCardButtonBrocolli = getByTestIdBrocolli('add-to-card-button-1');
        const addToCardButtonCucumber = getByTestIdCucumber('add-to-card-button-3');

        await user.click(addToCardButtonBrocolli);
        await user.click(addToCardButtonCucumber);

        const toggleModalButton = screen.getByTestId('toggle-modal-button');
        await user.click(toggleModalButton);

        const cardModalTotal = await screen.findByTestId('card-modal-total');

        const brocolliPrice = 120;
        const cucumberPrice = 48;
        const expectedTotal = brocolliPrice + cucumberPrice;

        expect(cardModalTotal).toHaveTextContent(`$${expectedTotal.toFixed(2)}`);
    });

    it('Должен появиться лоадер во время начальной загрузки продуктов', async () => {
        customRender(<App />);
        expect(screen.getByTestId('custom-loader')).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId('custom-loader')).not.toBeInTheDocument());
    });

    it('Должен отображать сообщение об ошибке, если загрузка продуктов завершилась неудачей', async () => {
        customRender(<App />);

        server.use(
            http.get(
                'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json',
                () => {
                    return HttpResponse.error();
                }
            )
        );

        const errorMessage = await screen.findByTestId('app-error-message');

        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent(/Произошла ошибка:/);
        expect(screen.queryByTestId('custom-loader')).not.toBeInTheDocument();
    });
});
