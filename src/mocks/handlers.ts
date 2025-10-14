import { http, HttpResponse } from 'msw';
import { productsResponse } from './response';

const PRODUCTS_API_URL =
    'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export const handlers = [
    http.get(PRODUCTS_API_URL, () => {
        return HttpResponse.json(productsResponse);
    }),
];
