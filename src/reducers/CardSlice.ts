import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/Product';

type CardItem = {
  product: Product;
  quantity: number;
};

type CardState = {
  cardItems: CardItem[];
};

const initialState: CardState = {
  cardItems: JSON.parse(localStorage.getItem('cardItems') || '[]'),
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    
    addToCard(state, action: PayloadAction<{ product: Product; quantity: number }>) {
      const { product, quantity } = action.payload;
      const existingItem = state.cardItems.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cardItems.push({ product, quantity });
      }

      localStorage.setItem('cardItems', JSON.stringify(state.cardItems));
    },

    removeFromCard(state, action: PayloadAction<number>) {
      state.cardItems = state.cardItems.filter(item => item.product.id !== action.payload);
      localStorage.setItem('cardItems', JSON.stringify(state.cardItems));
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        state.cardItems = state.cardItems.filter(item => item.product.id !== productId);
      } else {
        const item = state.cardItems.find(item => item.product.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }

      localStorage.setItem('cardItems', JSON.stringify(state.cardItems));
    },
  },
});

export const { addToCard, removeFromCard, updateQuantity } = cardSlice.actions;
export default cardSlice.reducer;