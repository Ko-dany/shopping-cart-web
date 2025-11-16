import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import type { CartItem } from "./models/types";
import { fetchCartItems } from "./api/cartApi";

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartItems = await fetchCartItems();
      setCart(cartItems);
      setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
      console.log("Cart loaded:", cartItems);
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  const handleCartUpdate = () => {
    loadCart();
  };

  return (
    <Router>
      <header className="bg-gray-100 p-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">
          Taso's Shoe Shop
        </Link>
        <Link to="/cart" className="font-semibold text-blue-600">
          Cart ({cartCount}) 🛒
        </Link>
      </header>
      <Routes>
        <Route
          path="/"
          element={<ProductsPage onCartUpdate={handleCartUpdate} />}
        />
        <Route
          path="/cart"
          element={<CartPage onCartUpdate={handleCartUpdate} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
