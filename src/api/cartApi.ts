import type { CartItem } from "../models/types";

// API base URL
const BASE_URL = "https://shopping-cart-api-22wy.onrender.com";

export const fetchCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
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
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const removeFromCart = async (productId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const emptyCart = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/emptycart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};
