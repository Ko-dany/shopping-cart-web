import type { CartItem } from "../models/types";

// API base URL
const BASE_URL = "http://localhost:8080";

export const fetchCart = async (): Promise<CartItem[]> => {
  // TODO: Implement API call to fetch cart items
  return [];
};

export const addToCart = async (productId: number): Promise<boolean> => {
  // TODO
  return false;
};

export const removeFromCart = async (cartId: number): Promise<boolean> => {
  // TODO
  return false;
};

export const emptyCart = async (): Promise<boolean> => {
  // TODO
  return false;
};
