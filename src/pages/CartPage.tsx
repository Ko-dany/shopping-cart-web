import React, { useState } from "react";
import CartItem from "../components/CartItem";
import type { Product } from "../models/types";

interface CartPageProps {
  initialCart: Product[];
}

const CartPage: React.FC<CartPageProps> = ({ initialCart }) => {
  const [cart, setCart] = useState<Product[]>(initialCart);

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-pink-600 text-center">
        Your Cart 🛒
      </h1>
      <button
        className="mb-4 bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-500 shadow font-semibold"
        onClick={handleEmptyCart}
      >
        Empty Cart ✨
      </button>
      <div className="space-y-3">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={handleRemove} />
        ))}
      </div>
      <h2 className="text-xl font-bold mt-6 text-purple-700">
        Total: ${total.toFixed(2)}
      </h2>
    </div>
  );
};

export default CartPage;
