import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../models/types";
import { addProductToCart, fetchProducts } from "../api/productApi";

interface ProductsPageProps {
  onCartUpdate: () => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onCartUpdate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setError(null);
    } catch (error) {
      console.error("Failed to load products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const confirmed = confirm(`Add ${product.name} to cart?`);
      if (confirmed) {
        console.log("Adding to cart:", product.id);
        const success = await addProductToCart(product.id);
        console.log("Add to cart success:", success);

        if (success) {
          alert(`${product.name} added to cart!`);
          console.log("Calling onCartUpdate...");
          await onCartUpdate();
          console.log("onCartUpdate completed");
        } else {
          alert(`Failed to add ${product.name} to cart.`);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 font-sans">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading products...</p>
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
            onClick={loadProducts}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
    </div>
  );
};

export default ProductsPage;
