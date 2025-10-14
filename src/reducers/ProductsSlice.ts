import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type Product } from '../types/Product';
import ProductService from '../api/ProductService';

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

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        const products = await ProductService.getAll();
        return products;
    }
);

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
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
                state.error = action.error.message || 'Ошибка загрузки';
            });
    },
});

export default productsSlice.reducer;