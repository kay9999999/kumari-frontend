import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        metal,
        metalColor,

        diamondQuality,
        size,
        quantity,
      } = action.payload;
      // Look for an existing cart item with the same id and variant selections.
      const existingIndex = state.products.findIndex(
        (item) =>
          item.id === id &&
          item.metal === metal &&
          item.metalColor === metalColor &&
          item.diamondQuality === diamondQuality &&
          item.size === size
      );

      if (existingIndex !== -1) {
        // If found, update quantity
        state.products[existingIndex].quantity += quantity;
      } else {
        // Otherwise, add new entry
        state.products.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.sku !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
