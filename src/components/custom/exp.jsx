"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/redux/cartReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);

  // Calculate the subtotal price
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container w-full max-w-[1040px] px-5 mx-auto">
      <div className="bag mt-[76px] lg:mt-[84px] xl:mt-[92px]">
        <div className="flex flex-col items-center py-20 px-5">
          <h1 className="mb-2 text-[24px] md:text-[36px] text-[#1A1A1A]">
            Review your bag.
          </h1>
          <div className="text-center font-semibold text-[14px] md:text-[15px] text-[#404040]">
            Get free shipping and free returns on all orders.
          </div>
        </div>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item.sku}
            className="bag-items w-full border-t border-[#e7e7e8] mb-5"
          >
            <div className="cart flex flex-col border-b border-[#e7e7e8] py-4">
              <div className="bag-iteminfo flex flex-col md:flex-row">
                <div className="bag-image w-[180px]">
                  <img
                    src={`${item?.image}`}
                    alt={item?.title || "Product Image"}
                    className="w-full object-cover"
                  />
                </div>
                <div className="bag-content flex flex-col flex-1 ml-4 mt-4 md:mt-0">
                  <div className="primary-info">
                    <div className="item-details">
                      <strong className="block break-words">
                        {item.title}
                      </strong>
                      <p className="mt-1 text-sm text-gray-600">
                        SKU: {item.sku}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Metal: {item.metal}
                      </p>
                      <p className="text-sm text-gray-600">
                        Metal Color: {item.metalColor}
                      </p>
                      <p className="text-sm text-gray-600">
                        Carat: {item.diamondWeight}
                      </p>
                      <p className="text-sm text-gray-600">
                        Diamond Quality: {item.diamondQuality}
                      </p>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                    </div>
                    <div className="qty-price flex justify-between mt-2">
                      <div className="qty flex items-center text-sm">
                        Quantity: {item.quantity || 1}
                      </div>
                      <div className="price text-right font-semibold text-sm">
                        ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button
                    className="mt-2 text-red-500 underline text-sm"
                    onClick={() => dispatch(removeItem(item.sku))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-10">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
