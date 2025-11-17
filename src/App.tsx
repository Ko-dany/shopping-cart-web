import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { fetchCartItems } from "./api/cartApi";

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      console.log("Loading cart...");
      const cartItems = await fetchCartItems();
      setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
      console.log("Cart loaded:", cartItems, "Count:", cartItems.length);
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  const handleCartUpdate = async () => {
    console.log("handleCartUpdate called");
    await loadCart();
    console.log("handleCartUpdate completed");
  };

  return (
    <Router>
      <header className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="font-bold text-2xl text-purple-700 hover:text-pink-600 transition-colors"
          >
            Taso's Shoe Shop 👟
          </Link>
          <Link
            to="/cart"
            className="font-semibold text-lg text-pink-600 hover:text-purple-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
          >
            Cart ({cartCount}) 🛒
          </Link>
        </div>
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
