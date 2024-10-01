import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [], // Changed from user to products to avoid confusion
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        allProducts: (state, action) => {
            state.products = action.payload; // Changed from user to products
        },
    },
});

// Action creators
export const { allProducts } = productsSlice.actions;

// Export the reducer
export default productsSlice.reducer;
