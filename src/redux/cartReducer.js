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
        sku,
        metal,
        metalColor,

        diamondQuality,
        size,
        quantity,
      } = action.payload;
      // Look for an existing cart item with the same id and variant selections.
      const existingIndex = state.products.findIndex(
        (item) =>
          item.sku === sku &&
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
    updateQuantity: (state, action) => {
      const { sku, quantity } = action.payload;
      const item = state.products.find((item) => item.sku === sku);
      if (item) {
        item.quantity = Math.max(1, quantity); // Ensure quantity never drops below 1
      }
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, updateQuantity, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
