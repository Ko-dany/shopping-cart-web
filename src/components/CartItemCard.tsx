import React from "react";
import type { Product, CartItem } from "../models/types";

interface CartItemProps {
  cartItem: CartItem;
  product: Product;
  onRemove: (id: number) => void;
}

export const CartItemCard: React.FC<CartItemProps> = ({
  cartItem,
  product,
  onRemove,
}) => {
  const subtotal = product.price * cartItem.quantity;

  return (
    <div className="flex items-center gap-4 p-4 border-2 border-pink-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-xl shadow-sm"
      />

      <div className="flex-1">
        <h3 className="font-bold text-lg text-purple-700">{product.name}</h3>
        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
        <p className="text-base font-semibold text-pink-600 mt-1">
          ${product.price.toFixed(2)} each
        </p>
        <p className="text-sm text-gray-700 mt-1">
          Quantity:{" "}
          <span className="font-bold text-purple-600">{cartItem.quantity}</span>
        </p>
      </div>

      <div className="text-right mr-4">
        <p className="text-sm text-gray-500 mb-1">Subtotal</p>
        <p className="text-2xl font-bold text-pink-600">
          ${subtotal.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => onRemove(cartItem.id)}
        className="bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-500 shadow font-semibold transition-colors"
      >
        Remove 🗑️
      </button>
    </div>
  );
};
