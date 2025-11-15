import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../models/types";

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Nike Shoe",
    description: "Red and White",
    price: 129.99,
    sku: "KEY-075",
    isActive: true,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    description: "Core Black",
    price: 179.99,
    sku: "AD-UB22-002",
    isActive: true,
    image: "https://via.placeholder.com/150",
  },
];

const ProductsPage: React.FC = () => {
  const [products] = useState<Product[]>(dummyProducts);
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) setCart((prev) => [...prev, product]);
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-pink-600 text-center">
        Taso's Shoe Shop 👟
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="mt-8 bg-purple-50 p-4 rounded-xl shadow-inner">
        <h2 className="text-xl font-bold mb-2 text-purple-700">
          Cart Preview ({cart.length})
        </h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-1">
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;
