import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import type { Product } from "./models/types";

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <Router>
      <header className="bg-gray-100 p-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">
          Taso's Shoe Shop
        </Link>
        <Link to="/cart" className="font-semibold text-blue-600">
          Cart ({cart.length}) 🛒
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage initialCart={cart} />} />
      </Routes>
    </Router>
  );
};

export default App;
