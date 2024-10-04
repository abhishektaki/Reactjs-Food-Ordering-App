import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'; // Import the reducer

const appStore = configureStore({
  reducer: {
    cart: cartReducer, // Add the cart reducer here
  },
});

export default appStore;
