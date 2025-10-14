import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import ProductService from '../api/ProductService';
import { type Product } from '../types/Product';
import { HTTPError } from 'ky';

type ProductsState = {
    productsList: Product[];
    loading: boolean;
    error: string | null;
};

const initialState: ProductsState = {
    productsList: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }> (
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
        const products = await ProductService.getAll();
        return products;
        } catch (e) {
            if (e instanceof HTTPError) {
                const status = e.response.status;
                const statusText = e.response.statusText;

                switch (status) {
                    case 404:
                        return rejectWithValue('Запрос не найден (404)');
                    case 500:
                        return rejectWithValue('Ошибка сервера (500)');
                    default:
                        return rejectWithValue(`Ошибка HTTP: ${status} ${statusText}`);
                }

            } else if (e instanceof Error) {
                return rejectWithValue(`Ошибка сети или нет подключения: ${e.message}`);
            } else {
                return rejectWithValue('Неизвестная ошибка');
            }
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.productsList = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? action.error.message ?? 'Ошибка загрузки';
            });
    },
});

export default productsSlice.reducer;