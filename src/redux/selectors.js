import { createSelector } from "@reduxjs/toolkit";

const selectCart = (state) => state.cart;
export const selectCartProducts = createSelector(
  [selectCart],
  (cart) => cart.products
);
