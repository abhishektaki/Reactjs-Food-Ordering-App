import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemIndex !== -1) {
        // If the item exists, increase the quantity
        state.items[itemIndex].quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          // If the item quantity is greater than 1, decrease the quantity
          state.items[itemIndex].quantity -= 1;
        } else {
          // Otherwise, remove the item from the cart
          state.items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
