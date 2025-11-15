import React from "react";
import type { Product } from "../models/types";

interface CartItemProps {
  item: Product;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between border-b py-2 px-3 rounded-lg bg-pink-50 shadow-sm hover:shadow-md transition">
      <div className="flex items-center space-x-3">
        <img
          src={item.image}
          alt={item.name}
          className="h-16 w-16 object-contain rounded-lg bg-white p-1"
        />
        <div>
          <h3 className="font-semibold text-pink-700">{item.name}</h3>
          <p className="text-purple-600 font-bold">${item.price}</p>
        </div>
      </div>
      <button
        className="bg-red-400 text-white px-3 py-1 rounded-full hover:bg-red-500 shadow"
        onClick={() => onRemove(item.id)}
      >
        ❌
      </button>
    </div>
  );
};

export default CartItem;
