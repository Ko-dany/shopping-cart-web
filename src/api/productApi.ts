import type { Product } from "../models/types";

// API base URL
const BASE_URL = "https://shopping-cart-api-22wy.onrender.com";

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

export const addProductToCart = async (productId: number): Promise<boolean> => {
  try {
    const selectedProduct = await getProductById(productId);
    if (!selectedProduct) {
      throw new Error("Product not found");
    }

    // Add the product to the cart
    const response = await fetch(`${BASE_URL}/cart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check response content type
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      // In case the server returns a JSON response indicating success
      const data = await response.json();
      return data.success ?? true;
    } else {
      // In case of a text response (e.g., "Product added to cart")
      const text = await response.text();
      console.log("Server response:", text);
      return true; // Consider success if 200 OK response
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return false;
  }
};

export const getProductById = async (
  productId: number
): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
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
