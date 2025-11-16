import React from "react";
import type { Product } from "../models/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-pink-50 rounded-2xl p-4 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-contain mb-3 rounded-xl bg-white p-2"
      />
      <h2 className="font-bold text-lg text-pink-700">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-1">{product.description}</p>
      <p className="text-purple-600 font-semibold text-lg">${product.price}</p>
      <p className="text-gray-400 text-xs mb-2">SKU: {product.sku}</p>
      <button
        className="mt-auto bg-pink-400 text-white py-2 px-4 rounded-full hover:bg-pink-500 font-semibold shadow-md cursor-pointer"
        onClick={() => onAddToCart(product.id)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
