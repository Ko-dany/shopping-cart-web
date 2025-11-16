import type { Product } from "../models/types";

// API base URL
const BASE_URL = "http://localhost:8080";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProductToCart = async (id: number): Promise<boolean> => {
  try {
    const selectedProduct = await getProductById(id);
    if (!selectedProduct) {
      throw new Error("Product not found");
    }
    // Add the product to the cart
    const response = await fetch(`${BASE_URL}/cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const addProduct = async (product: Product): Promise<boolean> => {
  // TODO
  return false;
};

export const updateProduct = async (
  id: number,
  product: Product
): Promise<boolean> => {
  // TODO
  return false;
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  // TODO
  return false;
};
