// src/redux/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../product/types/Product';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      // Add your filtering logic if necessary
    },
    setInStockOnly: (state, action: PayloadAction<boolean>) => {
      // Add your filtering logic if necessary
    }
  },
});

export const { addProduct, updateProduct, deleteProduct, setCategoryFilter, setInStockOnly } = productSlice.actions;
export default productSlice.reducer;
