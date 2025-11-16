import React, { useEffect, useState } from "react";
import type { CartItem, Product } from "../models/types";
import { emptyCart, fetchCartItems, removeFromCart } from "../api/cartApi";
import { fetchProducts } from "../api/productApi";
import { CartItemCard } from "../components/CartItemCard";

interface CartPageProps {
  onCartUpdate: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onCartUpdate }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCartAndProducts();
  }, []);

  const loadCartAndProducts = async () => {
    try {
      setLoading(true);
      const [cartItems, productList] = await Promise.all([
        fetchCartItems(),
        fetchProducts(),
      ]);
      setCart(cartItems);
      setProducts(productList);
      setError(null);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cartId: number) => {
    const confirmed = confirm("Remove this item from cart?");
    if (confirmed) {
      const success = await removeFromCart(cartId);
      if (success) {
        setCart((prev) => prev.filter((item) => item.id !== cartId));
        onCartUpdate();
        alert("Item removed from cart!");
      } else {
        alert("Failed to remove item from cart.");
      }
    }
  };

  const handleEmptyCart = async () => {
    const confirmed = confirm("Are you sure you want to empty your cart?");
    if (confirmed) {
      const success = await emptyCart();
      if (success) {
        setCart([]);
        onCartUpdate();
        alert("Cart emptied!");
      } else {
        alert("Failed to empty cart.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 font-sans">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 font-sans">
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button
            onClick={loadCartAndProducts}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const cartWithProducts = cart
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      return { cartItem, product };
    })
    .filter((item) => item.product !== undefined);

  const total = cartWithProducts.reduce(
    (sum, { cartItem, product }) => sum + product!.price * cartItem.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-pink-600 text-center">
        Your Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <button
            className="mb-4 bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-500 shadow font-semibold"
            onClick={handleEmptyCart}
          >
            Empty Cart ✨
          </button>
          <div className="space-y-3">
            {cartWithProducts.map(({ cartItem, product }) => (
              <CartItemCard
                key={cartItem.id}
                cartItem={cartItem}
                product={product!}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <h2 className="text-xl font-bold mt-6 text-purple-700">
            Total: ${total.toFixed(2)}
          </h2>
        </>
      )}
    </div>
  );
};

export default CartPage;
