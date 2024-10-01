import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Adjust if path is different
import productsReducer from "./productsSlice"; // Adjust if path is different

const store = configureStore({
    reducer: {
        user: userReducer, // Ensure this is correct
        products: productsReducer, // Ensure this is correct
    },
});

export default store;
